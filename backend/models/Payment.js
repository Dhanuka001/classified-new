import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  referenceNote: { type: String, default: '' },
  bankSlip: { type: String, required: true }, // Stores Cloudinary URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Payment', PaymentSchema);