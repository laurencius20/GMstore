import express from 'express';
import asyncHandler from 'express-async-handler';
import Payment from '../models/Payment.js';
import { upload } from '../middleware/fileUpload.js';
import DataUriParser from 'datauri/parser.js';
import { uploadToCloudinary } from '../cloudinary.js';
const parser = new DataUriParser();

const paymentRoutes = express.Router();

const uploadPayment = async (req, res) => {
  let image;
  if (req.file) {
    const file = parser.format('.jpg', req.file.buffer).content;
    image = await uploadToCloudinary(file, req.file.originalname);
  }
  // const { paymentPhoto } = req.body;
  try {
    await Payment.create({ paymentPhoto: image.secure_url });
    res.send({ Status: 'Ok' });
  } catch (error) {
    res.send({ Status: 'error', data: error });
  }
};

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

paymentRoutes.route('/upload-paymentPhoto').post(upload.single('paymentPhoto'), uploadPayment);
paymentRoutes.route('/get-paymentPhoto/:id').delete(deletePaymentPhoto);
paymentRoutes.route('/get-paymentPhoto').get(getImage);

export default paymentRoutes;
