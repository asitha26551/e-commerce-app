import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant' },  // reference to ProductVariant
  priceEach: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('OrderItem', orderItemSchema);
