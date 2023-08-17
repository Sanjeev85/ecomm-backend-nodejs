import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.data.password, 6);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    return res.status(200).send('User Created Successfully !! ');
  } catch (err) {
    return res.status(404).send('Internal Server Error');
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) throw Error("User doesn't exist");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) throw Error('Incorrect Password');

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    return res.status(200).send({ token: token });
  } catch (err) {
    return res.status(404).send({ msg: err.msg });
  }
};
