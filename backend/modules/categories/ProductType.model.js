import mongoose from 'mongoose';

const productTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
}, { timestamps: true });

export default mongoose.model('ProductType', productTypeSchema);
