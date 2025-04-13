import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, default: '' },
  image: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, default: '' },
  telegram: { type: String, default: '' },
  promotion: {
    type: String,
    enum: ['normal', 'super', 'vip', 'chatbox'],
    required: true, // Make required
  },
  cashbackGuarantee: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  page: {
    type: String,
    default: 'home',
  },
  position: {
    type: String,
    enum: ['top', 'middle', 'bottom'],
    default: 'top',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Ad', adSchema);