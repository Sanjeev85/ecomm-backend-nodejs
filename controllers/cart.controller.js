import Cart from '../models/cart.js';
// view cart
export const getCartItemsByUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const cartItems = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    });
    if (!cartItems) throw Error('cart is empty :(');

    return res.status(200).send({ productsInCart: cartItems.products });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

export const updateQuantityOfProduct = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.body.productId;
  const updatedQuantity = req.body.quantity;
  const flag = req.params.flag;

  try {
    const cartItemToBeUpdated = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    });

    if (!cartItemToBeUpdated) throw Error('Cart Item not Found');

    const productsInsideCart = cartItemToBeUpdated.products;

    const productToUpdate = productsInsideCart.find(
      (product) => product.product._id.toString() === productId
    );

    if (!productToUpdate) {
      return res.status(404).send('Product not found in the cart');
    }

    if (flag === 'inc') {
      if (productToUpdate.product.stockQuanity - updatedQuantity >= 0) {
        productToUpdate.quantity += updatedQuantity;
        productToUpdate.product.stockQuanity -= updatedQuantity;
      } else
        throw Error('Cannot Fullfill request as Stock quantity < required');
    } else {
      productToUpdate.quantity -= updatedQuantity;
      productToUpdate.product.stockQuanity += updatedQuantity;
    }

    await productToUpdate.product.save();
    await cartItemToBeUpdated.save();
    return res.status(200).send({ updatedCartItem: cartItemToBeUpdated });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const removeProductFromCart = async (req, res, next) => {
  const productIdToBeRemoved = req.params.productId;
  const userId = req.params.userId;

  try {
    const cartItemOfUser = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    });

    if (!cartItemOfUser) {
      return res.status(404).send({ message: 'CartItem not found' });
    }

    const item = cartItemOfUser.products.find(
      (product) => product._id.toString() === productIdToBeRemoved
    );

    if (!item)
      return res.status(404).send({ message: 'Product does not exist !!!' });

    cartItemOfUser.products = cartItemOfUser.products.filter(
      (product) => product._id.toString() !== productIdToBeRemoved
    );

    await cartItemOfUser.save();
    return res
      .status(200)
      .send({ message: 'Item Removed Successfully From Cart' });
  } catch (err) {
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const addProductToCart = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  try {
    const cartItemOfUser = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    });

    if (!cartItemOfUser) {
      return res.status(404).send({ message: 'Cart not found' });
    }

    cartItemOfUser.products.push({
      product: productId,
      quantity: quantity,
    });

    await cartItemOfUser.save();
    return res.status(200).send({ message: 'Product added successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
