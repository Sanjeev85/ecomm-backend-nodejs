import order from '../models/order.js';
import OrderHistory from '../models/orderHistory.js';

export const getOrderHistoryByUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const orderHistory = await OrderHistory.find({ user: userId }).populate({
      path: 'orders',
      model: 'Order',
    });

    if (!orderHistory) throw Error('No Order history');

    return res.status(200).send({ orderHistory: orderHistory });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};
