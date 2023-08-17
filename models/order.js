import mongoose from 'mongoose';
import { orderStatus, paymentStatus } from '../enums/enum';

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
    orderDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: Object.values(orderStatus),
      default: 'Pending',
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      pinCode: String,
      country: String,
    },
    paymentMethod: String,
    paymentStatus: {
      type: String,
      enum: Object.values(paymentStatus),
      default: 'Pending',
    },
    totalAmount: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
