import express from 'express';
import { addProduct, getAllProducts, removeProductById, getProductById, getBestSellers } from './product.controller.js';
import upload from '../../middleware/multer.js';
import adminAuth from '../../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/', adminAuth,upload.fields([
    {name:'image1', maxCount:1}, 
    {name:'image2', maxCount:1},
    {name:'image3', maxCount:1}, 
    {name:'image4', maxCount:1}]
), adminAuth, addProduct);               

productRouter.get('/bestsellers', getBestSellers);
productRouter.get('/', getAllProducts);            
productRouter.get('/:id', getProductById);         
productRouter.delete('/:id', adminAuth, removeProductById);  

export default productRouter;