import express from 'express';
import { addToCart, getUserCart, updateCart } from './cart.controller.js';
import auth from '../../middleware/auth.js';


const cartRouter = express.Router()

cartRouter.post('/', auth, addToCart);           // Add item to logged-in user's cart
cartRouter.put('/:itemId', auth, updateCart);   // Update item in cart
cartRouter.get('/me', auth, getUserCart);        // Get logged-in user's cart

export default cartRouter;