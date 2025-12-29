import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, getOrderById } from './order.controller.js';
import adminAuth from '../../middleware/adminAuth.js';
import auth from '../../middleware/auth.js';

const orderRouter = express.Router();

// Create new order (Cash on Delivery)
orderRouter.post('/', auth, placeOrder);

// Payment integrations
orderRouter.post('/stripe', auth, placeOrderStripe);
orderRouter.post('/razorpay', auth, placeOrderRazorpay);
// Stripe webhook (for reference, handled in server.js for raw body)
// orderRouter.post('/stripe/webhook', verifyStripePayment);

// List all orders (admin)
orderRouter.get('/', adminAuth, allOrders);

// Get all orders for a user
orderRouter.get('/user', auth, userOrders);

// Update order status (admin)
orderRouter.put('/:orderId/status', adminAuth, updateStatus);


// Verify if order exists for a Stripe session (for frontend verification page)
import Order from './Order.model.js';
orderRouter.get('/verify', async (req, res) => {
	const { session_id } = req.query;
	if (!session_id) return res.status(400).json({ orderId: null });
	// Find order by checkoutSessionId (session_id is Stripe session id)
	const order = await Order.findOne({ checkoutSessionId: session_id });
	if (order) {
		return res.json({ orderId: order._id });
	} else {
		return res.json({ orderId: null });
	}
});

orderRouter.get('/:orderId', auth, getOrderById);

export default orderRouter;