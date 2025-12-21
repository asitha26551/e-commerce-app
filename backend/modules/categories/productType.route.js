import express from 'express';
import { addProductType, getProductTypes } from './productType.controller.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getProductTypes);
router.post('/', adminAuth, addProductType);

export default router;
