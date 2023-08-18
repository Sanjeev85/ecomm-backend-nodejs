import Product from '../models/product.js';
import Category from '../models/category.js';
import User from '../models/user.js';

// add Product
export const addProduct = async (req, res, next) => {
  const productDetails = { ...req.body };

  try {
    const newProduct = new Product(productDetails);
    const category = await Category.findOne({ name: productDetails.category });

    category.products.push(newProduct);

    await category.save();
    await newProduct.save();

    return res.status(200).send({ message: 'Added Product Successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

// find product by id
export const getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).send({
        message:
          'User doest not exist. Kindly Provide appropriate authorization ',
      });

    const product = await Product.findById(productId);
    if (!product) throw Error("Product doesn't exist");

    return res.status(200).send({ product: product });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

// get all product by category id
export const getProductsByCategoryId = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).send({
        message:
          'User doest not exist. Kindly Provide appropriate authorization ',
      });

    const allProductByCategoryId = await Category.findById(categoryId).populate(
      'products'
    );

    if (!allProductByCategoryId) throw Error('No Products By This Category');

    return res.status(200).send({ products: allProductByCategoryId.products });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};
