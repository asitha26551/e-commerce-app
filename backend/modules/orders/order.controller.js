import Order from './Order.model.js';
import OrderItem from './OrderItem.model.js';
import CartItem from '../cart/CartItem.model.js';
import Stripe from 'stripe';

//global variables
const currency = 'usd';
const deliveryCharge = 0;

//Stripe gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing orders using Cash on delivery Method
const placeOrder = async (req, res) => {
    try {
        console.log('DEBUG placeOrder req.body:', req.body);
        const { items, subtotal, shippingFee, total, address } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'No userId from token. Are you logged in?' });
        }
        if (!items || !Array.isArray(items) || items.length === 0 || !address || !address.fullName || !address.line1 || !address.city || !address.postalCode || !address.country) {
            return res.status(400).json({ message: 'Invalid order data', debug: { items, address } });
        }

        // Optionally, store address fields in the order (if schema allows)
        const order = await Order.create({
            userId,
            subtotal,
            shippingFee,
            total,
            paymentMethod: 'Cash On Delivery',
            status: 'Order Placed',
            shippingAddress: address, // This will only work if you add shippingAddress to Order model
        });

        // Create order items
        const orderItems = await Promise.all(items.map(async (item) => {
            return await OrderItem.create({
                orderId: order._id,
                productId: item.productId,
                quantity: item.quantity,
                variantId: item.variantId,
                priceEach: item.priceEach,
            });
        }));

        // Clear user's cart in DB
        await CartItem.deleteMany({ userId });

        res.status(201).json({
            message: 'Order placed successfully',
            order,
            orderItems,
        });
    } catch (error) {
        console.error('ERROR in placeOrder:', error);
        res.status(500).json({ message: 'Failed to place order', error: error.message, stack: error.stack });
    }
}

//placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { items, subtotal, shippingFee, total, address } = req.body;

        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'No userId from token. Are you logged in?' });
        }
        if (!items || !Array.isArray(items) || items.length === 0 || !address || !address.fullName || !address.line1 || !address.city || !address.postalCode || !address.country) {
            return res.status(400).json({ message: 'Invalid order data', debug: { items, address } });
        }

        // Prepare line items for Stripe
        const line_items = items.map(item => ({
            price_data: {
                currency,
                product_data: {
                    name: item.productName || 'Product',
                },
                unit_amount: Math.round(item.priceEach * 100), // Stripe expects cents
            },
            quantity: item.quantity,
        }));

        if (shippingFee && shippingFee > 0) {
            line_items.push({
                price_data: {
                    currency,
                    product_data: { name: 'Shipping Fee' },
                    unit_amount: Math.round(shippingFee * 100),
                },
                quantity: 1,
            });
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart?cancelled=1`,
            metadata: {
                userId: userId.toString(),
                address: JSON.stringify(address),
                items: JSON.stringify(items),
                subtotal: subtotal.toString(),
                shippingFee: shippingFee.toString(),
                total: total.toString(),
            },
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('ERROR in placeOrderStripe:', error);
        res.status(500).json({ message: 'Failed to create Stripe Checkout Session', error: error.message });
    }
}

//placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {

}

// Get single order by ID (for order details page)
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const userId = req.userId;
        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }
        // Only allow user to fetch their own order (or admin logic if needed)
        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Fetch order items and populate product and variant if needed
        const items = await OrderItem.find({ orderId: order._id })
            .populate({ path: 'productId', select: 'name images' })
            .populate({ path: 'variantId', select: 'name' });
        // Format items for frontend
        const formattedItems = items.map(item => ({
            _id: item._id,
            product: item.productId ? {
                name: item.productId.name,
                images: item.productId.images,
            } : null,
            variant: item.variantId ? { name: item.variantId.name } : null,
            quantity: item.quantity,
            priceEach: item.priceEach,
        }));
        res.status(200).json({ order: { ...order.toObject(), items: formattedItems } });
    } catch (error) {
        console.error('ERROR in getOrderById:', error);
        res.status(500).json({ message: 'Failed to fetch order', error: error.message, stack: error.stack });
    }
}

//All order for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        // Attach items to each order
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await OrderItem.find({ orderId: order._id })
                    .populate({ path: 'productId', select: 'name' })
                    .populate({ path: 'variantId', select: 'name' });
                return { ...order.toObject(), items };
            })
        );
        res.status(200).json({ orders: ordersWithItems });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch all orders', error: error.message });
    }
}

//Single User order data
const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        // Attach basic item details to each order for history view
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await OrderItem.find({ orderId: order._id })
                    .populate({ path: 'productId', select: 'name images' })
                    .populate({ path: 'variantId', select: 'name' });

                const formattedItems = items.map((item) => ({
                    _id: item._id,
                    product: item.productId
                        ? {
                              name: item.productId.name,
                              images: item.productId.images,
                          }
                        : null,
                    variant: item.variantId ? { name: item.variantId.name } : null,
                    quantity: item.quantity,
                    priceEach: item.priceEach,
                }));

                return { ...order.toObject(), items: formattedItems };
            })
        );

        res.status(200).json({ orders: ordersWithItems });
    } catch (error) {
        console.error('ERROR in userOrders:', error);
        res.status(500).json({ message: 'Failed to fetch user orders', error: error.message, stack: error.stack });
    }
}

//Update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: 'Order ID and status are required' });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ success: true, message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update order status', error: error.message });
    }
}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    getOrderById
}