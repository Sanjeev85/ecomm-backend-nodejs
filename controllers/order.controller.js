import Cart from '../models/cart.js';
import Order from '../models/order.js';
import OrderHistory from '../models/orderHistory.js';

export const getOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const orderDetails = await Order.findById(orderId);
    if (!orderDetails) throw Error('Invalid Order Id');

    return res.status(200).send({ orderDetails: orderDetails });
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const placeOrder = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    const cartItemOfPlacedOrder = await Cart.findOne({ user: userId }).populate(
      {
        path: 'products.product',
        model: 'Product',
      }
    );
    if (!cartItemOfPlacedOrder)
      return res.status(404).send({ message: 'Cart Item Not Found' });

    // get Product whose order is placed
    const productWhoseOrderIsPlaced = cartItemOfPlacedOrder.products.filter(
      (product) => product._id.toString() === productId
    );

    //remove product from cartItems
    cartItemOfPlacedOrder.products = cartItemOfPlacedOrder.products.filter(
      (product) => product._id.toString() !== productId
    );

    // create new Order Schema
    const addProductToOrder = new Order({
      user: userId,
      products: [
        { product: productId, quantity: productWhoseOrderIsPlaced.quantity },
      ],
      status: 'Successfull',
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: 'Successfull',
      totalAmount:
        productWhoseOrderIsPlaced.price * productWhoseOrderIsPlaced.quantity,
    });

    // added order to order schema
    const order = await addProductToOrder.save();

    const addedToOrderHistory = new OrderHistory({
      orderId: order._id,
      user: userId,
    });

    //add order to order history

    await addedToOrderHistory.save();
    // updated cartItem
    await cartItemOfPlacedOrder.save();

    return res.status(200).send({ message: 'Order placed successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
