import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
    },
    stockQuanity: {
      type: Number,
      default: 0,
    },
    imageUrl: [String],
    default: [],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        value: { type: Number, min: 1, max: 5 },
      },
    ],
    default: [],
    averageRating: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
      },
    ],
    default: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
