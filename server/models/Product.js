import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
    title: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    brand: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    reviews: [reviewSchema],
    rating: { type: Number, require: true, default: 0 },
    numberOfReviews: { type: Number, require: true, default: 0 },
    price: { type: Number, require: true, default: 0 },
    stock: { type: Number, require: true, default: 0 },
    productIsNew: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
