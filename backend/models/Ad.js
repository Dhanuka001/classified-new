import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['live-cam', 'girls-personal', 'spa', 'shemale'],
    required: true,
  },
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
    default: 'normal',
  },
  cashbackGuarantee: { type: Boolean, default: false },
  page: { type: String, default: 'home' },
  position: { type: String, default: 'middle' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false },
  feedback: { type: String, default: '' }, // New field for rejection feedback
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Ad', AdSchema);