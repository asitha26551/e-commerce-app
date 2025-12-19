import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  size: { type: String, required: true },
  color: { type: String },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('ProductVariant', productVariantSchema);
