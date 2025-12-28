import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, getOrderById } from './order.controller.js';
import adminAuth from '../../middleware/adminAuth.js';
import auth from '../../middleware/auth.js';

const orderRouter = express.Router();

// Create new order (Cash on Delivery)
orderRouter.post('/', auth, placeOrder);

// Payment integrations
orderRouter.post('/stripe', auth,placeOrderStripe);
orderRouter.post('/razorpay', auth, placeOrderRazorpay);

// List all orders (admin)
orderRouter.get('/', adminAuth, allOrders);

// Get all orders for a user
orderRouter.get('/user', auth, userOrders);

// Update order status (admin)
orderRouter.put('/:orderId/status', adminAuth, updateStatus);

orderRouter.get('/:orderId', auth, getOrderById);

export default orderRouter;