import express from 'express';
import { addCategory, getCategories } from './category.controller.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();


// Get all categories with subcategories and product types
router.get('/', getCategories);
router.post('/', adminAuth, addCategory);

export default router;
