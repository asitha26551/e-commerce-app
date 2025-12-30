import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './modules/users/user.route.js';
import productRouter from './modules/products/product.route.js';
import categoryRouter from './modules/categories/category.route.js';
import subcategoryRouter from './modules/categories/subcategory.route.js';
import productTypeRouter from './modules/categories/productType.route.js';
import cartRouter from './modules/cart/cart.route.js';
import orderRouter from './modules/orders/order.route.js';
import { handleStripeWebhook } from './services/stripeWebhook.js';

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(cors())

// Stripe webhook REST endpoint: must use raw body and be registered
// before express.json so the signature can be verified correctly.
app.post('/api/order/stripe/webhook',
    bodyParser.raw({ type: 'application/json' }),
    async (req, res) => {
        const sig = req.headers['stripe-signature'];
        const { status, body } = await handleStripeWebhook(req.body, sig);
        res.status(status).json(body);
    }
);

app.use(express.json());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/subcategory', subcategoryRouter);
app.use('/api/product-type', productTypeRouter);

app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req,res) =>{
    res.send("API working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))