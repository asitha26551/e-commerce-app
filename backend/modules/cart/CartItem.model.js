import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  // Make variant optional so basic cart works without variants
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: false },
  quantity: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model('CartItem', cartItemSchema);
