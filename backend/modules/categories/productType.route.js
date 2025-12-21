import express from 'express';
import { addProductType } from './productType.controller.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/', adminAuth, addProductType);

export default router;
