import express from 'express';
import {
  createCategory,
  getAllCategories,
} from '../controllers/category.controller.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);

export default router;
