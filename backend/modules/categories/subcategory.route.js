import express from 'express';
import { addSubcategory } from './subcategory.controller.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/', adminAuth, addSubcategory);

export default router;
