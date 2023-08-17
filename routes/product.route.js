import express from 'express';
import {
  getProductsByCategoryId,
  getProductById,
  addProduct,
} from '../controllers/product.controller.js';

const router = express.Router();
router.get('/:id', getProductById);
router.get('/category/:id', getProductsByCategoryId);
router.post('/', addProduct);
export default router;
