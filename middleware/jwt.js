import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (token == null) {
      return res.status(403).send('Access Denied');
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = user.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
