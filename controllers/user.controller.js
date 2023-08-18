import OrderHistory from '../models/orderHistory.js';

export const getOrderHistoryByUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const orderHistory = await OrderHistory.find({ user: userId }).populate({
      path: 'orders',
      model: 'Order',
      populate: {
        path: 'products.product',
        model: 'Product',
      },
    });

    if (!orderHistory)
      return res.status(404).send('No Order history for this user');

    return res.status(200).send({ orderHistory: orderHistory });
  } catch (err) {
    return res.status(500).send('Internal server error ');
  }
};
