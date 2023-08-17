import mongoose, { isValidObjectId } from 'mongoose';
import Product from '../models/product.js';
import category from '../models/category.js';

// add Product
export const addProduct = async (req, res, next) => {
  const productDetails = req.body;
  try {
    const newProduct = new Product(productDetails);
    await newProduct.save();

    return res.status(200).send({ message: 'Added Product Successfully' });
  } catch (err) {
    return res.send(404).send({ message: 'Internal Server Error' });
  }
};

// find product by id
export const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  try {
    if (!isValidId(productId)) throw Error('Invalid ProductId');

    const product = await Product.findById(productId);
    if (!product) throw Error("Product doesn't exist");

    return res.status(200).send({ product: product });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

// get all product by category id
export const getProductsByCategoryId = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    if (!isValidObjectId(categoryId)) throw Error('Invalid Category ID');

    const allProductByCategoryId = await category
      .findById(categoryId)
      .populate('products');

    console.log(allProductByCategoryId);

    if (!allProductByCategoryId) throw Error('No Products By This Category');

    return res.status(200).send({ products: allProductByCategoryId });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

const isValidId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) return false;

  return true;
};
