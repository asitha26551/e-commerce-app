import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
  subtotal: Number,
  shippingFee: Number,
  total: Number,
  paymentMethod: { type: String, enum: ['card','cod','wallet','bank'], default: 'card' },
  paymentStatus: { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
