import express from 'express';
import { getOrderById, placeOrder } from '../controllers/order.controller.js';
import { getOrderHistoryByUser } from '../controllers/user.controller.js';
import {
  addProductToCart,
  getCartItemsByUser,
  removeProductFromCart,
  updateQuantityOfProduct,
} from '../controllers/cart.controller.js';

const userRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for users
 */

/**
 * @swagger
 * /user/order/{orderId}:
 *   get:
 *     summary: Get an order by orderId
 *     tags: [Users]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved order
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */
userRoute.get('/order/:orderId', getOrderById);

/**
 * @swagger
 * /user/order/{userId}/placeOrder/{productId}:
 *   post:
 *     summary: Place an order
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   pinCode:
 *                     type: string
 *                   country:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *       '404':
 *         description: Cart Item Not Found
 *       '500':
 *         description: Internal server error
 */
userRoute.post('/order/:userId/placeOrder/:productId', placeOrder);

/**
 * @swagger
 * /user/orderhistory/{userId}:
 *   get:
 *     summary: Get order history by userId
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved order history
 *       '404':
 *         description: No Order history for this user
 *       '500':
 *         description: Internal server error
 */
userRoute.get('/orderhistory/:userId', getOrderHistoryByUser);

/**
 * @swagger
 * /user/cart/{userId}/addProduct:
 *   post:
 *     summary: Add a product to user's cart
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *                   stockQuanity:
 *                     type: number
 *                   imageUrl:
 *                     type: array
 *                     items:
 *                       type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Product added to cart successfully
 *       '500':
 *         description: Internal server error
 */
userRoute.post('/cart/:userId/addProduct', addProductToCart);

/**
 * @swagger
 * /user/cart/{userId}:
 *   get:
 *     summary: Get cart items by userId
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved cart items
 *       '400':
 *         description: Required quantity cannot be fullfilled
 *       '500':
 *         description: Internal server error
 */
userRoute.get('/cart/:userId', getCartItemsByUser);

/**
 * @swagger
 * /user/cart/{userId}/{flag}:
 *   post:
 *     summary: Update quantity of a product in user's cart
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: flag
 *         in: path
 *         required: true
 *         description: inc to increment quantity, dec to decrement quantity
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Cart item quantity updated successfully
 *       '404':
 *         description: Product not found in the cart
 *       '500':
 *         description: Internal server error
 */
userRoute.post('/cart/:userId/:flag', updateQuantityOfProduct);

/**
 * @swagger
 * /user/cart/{userId}/{productId}:
 *   delete:
 *     summary: Remove a product from user's cart
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to be removed
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product removed from cart successfully
 *       '404':
 *         description: Item not found
 *       '500':
 *         description: Internal server error
 */
userRoute.delete('/cart/:userId/:productId', removeProductFromCart);

export default userRoute;
