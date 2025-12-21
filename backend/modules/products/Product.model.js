import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
  brand: String,
  condition: { type: String, enum: ['new','used'], default: 'new' },
  sellerId: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
