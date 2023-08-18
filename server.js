import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import { verifyToken } from './middleware/jwt.js';
import categoryRoute from './routes/catergory.route.js';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import rateLimit from 'express-rate-limit';
import setupSwagger from './swagger.js';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT || 5000;

// ! initial configuration
const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecomerceApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongoDB!');
  } catch (error) {
    console.log(error);
  }
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(compression());

setupSwagger(app);

// ! initial routes

app.use('/api/auth', authRoute);
app.use('/api/categories', verifyToken, categoryRoute);
app.use('/api/products', verifyToken, productRoute);
app.use('/api/user', verifyToken, userRoute);

app.listen(PORT, () => {
  connect();
  console.log('server running on port ' + PORT);
});
