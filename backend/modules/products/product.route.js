import express from 'express';
import { addProduct, getAllProducts, removeProductById, getProductById } from './product.controller.js';
import upload from '../../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/',upload.fields([
    {name:'image1', maxCount:1}, 
    {name:'image2', maxCount:1},
    {name:'image3', maxCount:1}, 
    {name:'image4', maxCount:1}]
), addProduct);               
productRouter.get('/', getAllProducts);            
productRouter.get('/:id', getProductById);         
productRouter.delete('/:id', removeProductById);  

export default productRouter;