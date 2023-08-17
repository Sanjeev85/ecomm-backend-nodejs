import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    default: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Category', categorySchema);
