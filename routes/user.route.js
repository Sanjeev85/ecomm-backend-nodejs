import express from 'express';
import { getOrderById, placeOrder } from '../controllers/order.controller.js';
import { getOrderHistoryByUser } from '../controllers/user.controller.js';
import {
  addProductToCart,
  getCartItemsByUser,
  removeProductFromCart,
  updateQuantityOfProduct,
} from '../controllers/cart.controller.js';

const router = express.Router();

// users order related routes
router.get('/order/:orderId', getOrderById);
router.post('/order/:userId/placeOrder/:productId', placeOrder);

// get orderhistory by userid
router.get('/orderhistory/:userId', getOrderHistoryByUser);

// all routes related to user cart
router.post('/cart/:userId/addProduct', addProductToCart);
router.get('/cart/:userId', getCartItemsByUser);
// here flag == "inc" -> to increment quantity, flag == 'dec' to decrement quantity
router.post('/cart/:userId/:flag', updateQuantityOfProduct);
router.delete('/cart/:userId/:productId', removeProductFromCart);

export default router;
