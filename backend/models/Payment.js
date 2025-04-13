import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    referenceNote: { type: String, default: '' }, // Optional
    bankSlip: { type: String, required: true }, // Stores file path for bank slip
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);