import express from 'express';
import {
  getProductsByCategoryId,
  getProductById,
  addProduct,
} from '../controllers/product.controller.js';

const router = express.Router();
//find product by productId
router.get('/:productId', getProductById);

//all products by categoryId
router.get('/category/:categoryId', getProductsByCategoryId);

// create product
router.post('/', addProduct);
export default router;
