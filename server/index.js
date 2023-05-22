import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './database.js';
import express from 'express';

// Our Routes
import productRoutes from './routes/productRoutes.js';
import userRouters from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import path from 'path';

connectToDatabase();
const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRouters);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

const port = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});
