import express from 'express';
import {
  getProductsByCategoryId,
  getProductById,
  addProduct,
} from '../controllers/product.controller.js';

const productRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for products
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a product by productId
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved product
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
productRoute.get('/:productId', getProductById);

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get all products by categoryId
 *     tags: [Products]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved products
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */
productRoute.get('/category/:categoryId', getProductsByCategoryId);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     parameters:
 *       - name: product
 *         description: Product object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *             category:
 *               type: string
 *             stockQuanity:
 *               type: number
 *             imageUrl:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
productRoute.post('/', addProduct);

export default productRoute;
