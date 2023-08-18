import express from 'express';
import {
  createCategory,
  getAllCategories,
} from '../controllers/category.controller.js';

const categoryRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: Successfully retrieved categories
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     parameters:
 *       - name: category
 *         description: Category object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '201':
 *         description: Category created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

categoryRoute.get('/', getAllCategories);
categoryRoute.post('/', createCategory);

export default categoryRoute;
