import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentPhoto: {
    type: String,
    require: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
