import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, default: '' }, // Made optional as per frontend
  image: { type: String, required: true }, // Stores file path for uploaded image
  phone: { type: String, required: true },
  whatsapp: { type: String, default: '' }, // Optional
  telegram: { type: String, default: '' }, // Optional
  promotion: {
    type: String,
    enum: ['normal', 'super', 'vip'],
    default: 'normal',
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