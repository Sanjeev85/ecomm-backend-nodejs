import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
    default: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cart', cartSchema);
