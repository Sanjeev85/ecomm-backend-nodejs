import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
    default: [],
    orderDate: { type: Date, default: Date.now },
    status: {
      type: String,
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
      default: 'Pending',
    },
    totalAmount: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
