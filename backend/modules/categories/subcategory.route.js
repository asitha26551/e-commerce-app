import express from 'express';
import { addSubcategory, getSubcategories } from './subcategory.controller.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getSubcategories);
router.post('/', adminAuth, addSubcategory);

export default router;
