import express from 'express';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import gzip from 'gzip';
import authRoute from './routes/auth.route.js';

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

app.use(cors());
app.use(express.json());
dotenv.config();

// ! initial routes

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  connect();
  console.log('server running on port ' + PORT);
});
