import express from 'express';
import { addProduct, getAllProducts, removeProductById, getProductById } from './product.controller.js';
import upload from '../../middleware/multer.js';
import { adminAuth } from '../../middleware/auth.js';

const productRouter = express.Router();

productRouter.post('/',adminAuth,upload.fields([
    {name:'image1', maxCount:1}, 
    {name:'image2', maxCount:1},
    {name:'image3', maxCount:1}, 
    {name:'image4', maxCount:1}]
), addProduct);               
productRouter.get('/', adminAuth, getAllProducts);            
productRouter.get('/:id', adminAuth, getProductById);         
productRouter.delete('/:id', adminAuth, removeProductById);  

export default productRouter;