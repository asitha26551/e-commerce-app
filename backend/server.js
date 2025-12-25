import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './modules/users/User.route.js';
import productRouter from './modules/products/Product.route.js';
import categoryRouter from './modules/categories/category.route.js';
import subcategoryRouter from './modules/categories/subcategory.route.js';
import productTypeRouter from './modules/categories/productType.route.js';
import cartRouter from './modules/cart/cart.route.js';

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/subcategory', subcategoryRouter);
app.use('/api/product-type', productTypeRouter);

app.use('/api/cart', cartRouter);

app.get('/', (req,res) =>{
    res.send("API working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))