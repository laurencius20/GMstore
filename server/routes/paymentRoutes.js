import express from 'express';
import asyncHandler from 'express-async-handler';
import Payment from '../models/Payment.js';

const paymentRoutes = express.Router();

const uploadPayment = asyncHandler(async (req, res) => {
  const { paymentPhoto } = req.body;

  try {
    await Payment.create({ paymentPhoto });
    res.send({ Status: 'Ok' });
  } catch (error) {
    res.send({ Status: 'error', data: error });
  }
});

const getImage = async (req, res) => {
  const photo = await Payment.find({});
  res.json(photo);
};

const deletePaymentPhoto = asyncHandler(async (req, res) => {
  const payment = await Payment.findByIdAndDelete(req.params.id);

  if (payment) {
    res.json(payment);
  } else {
    res.status(404);
    throw new Error('Payment Proof not found.');
  }
});

paymentRoutes.route('/upload-paymentPhoto').post(uploadPayment);
paymentRoutes.route('/get-paymentPhoto/:id').delete(deletePaymentPhoto);
paymentRoutes.route('/get-paymentPhoto').get(getImage);

export default paymentRoutes;
