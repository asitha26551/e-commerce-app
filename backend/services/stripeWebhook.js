import Stripe from 'stripe';
import Order from '../modules/orders/Order.model.js';
import OrderItem from '../modules/orders/OrderItem.model.js';
import CartItem from '../modules/cart/CartItem.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Handles Stripe webhook events and creates order after successful payment.
 * @param {Buffer} rawBody - The raw request body.
 * @param {string} sig - The Stripe signature from headers.
 * @returns {Promise<{status:number, body:object}>}
 */
export async function handleStripeWebhook(rawBody, sig) {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { status: 400, body: { success: false, message: `Webhook Error: ${err.message}` } };
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Check if order already exists
    const existingOrder = await Order.findOne({ paymentIntentId: session.payment_intent });
    if (existingOrder) {
      return { status: 200, body: { received: true } };
    }
    // Retrieve metadata
    const userId = session.metadata?.userId;
    const items = JSON.parse(session.metadata?.items || '[]');
    const address = session.metadata?.address ? JSON.parse(session.metadata.address) : undefined;
    const subtotal = Number(session.metadata?.subtotal || 0);
    const shippingFee = Number(session.metadata?.shippingFee || 0);
    const total = Number(session.metadata?.total || 0);
    if (!userId || !items.length) {
      return { status: 400, body: { success: false, message: 'Missing user or cart data' } };
    }
    // Create order and order items
    const order = await Order.create({
      userId,
      paymentIntentId: session.payment_intent,
      checkoutSessionId: session.id,
      subtotal,
      shippingFee,
      total,
      paymentMethod: 'Stripe',
      status: 'Order Placed',
      paymentStatus: 'paid',
      shippingAddress: address,
    });
    await Promise.all(items.map(async (item) => {
      await OrderItem.create({
        orderId: order._id,
        productId: item.productId,
        quantity: item.quantity,
        variantId: item.variantId,
        priceEach: item.priceEach,
      });
    }));
    // Clear user's cart in DB
    await CartItem.deleteMany({ userId });
    return { status: 200, body: { received: true } };
  }

  // Handle payment failures/cancellations: delete order if exists
  if (event.type === 'checkout.session.expired' || event.type === 'payment_intent.payment_failed') {
    const session = event.data.object;
    const order = await Order.findOne({ paymentIntentId: session.payment_intent });
    if (order) {
      await Order.deleteOne({ _id: order._id });
      await OrderItem.deleteMany({ orderId: order._id });
    }
    return { status: 200, body: { received: true } };
  }

  return { status: 200, body: { received: true } };
}
