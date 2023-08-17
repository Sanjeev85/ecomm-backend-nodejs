import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cart from '../models/cart.js';

export const register = async (req, res, next) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) throw Error('Email Already Exist');

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    const cart = new Cart({ user: user._id });

    await cart.save();

    return res.status(200).send('User Created Successfully !! ');
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log(req.body);
    if (!user) throw Error("User doesn't exist");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) throw Error('Incorrect Password');

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    return res.status(200).send({ token: token });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};
