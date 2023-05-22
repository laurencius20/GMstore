import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

// Our Routes
import productRoutes from './routes/productRoutes.js';
import userRouters from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRouters);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});
