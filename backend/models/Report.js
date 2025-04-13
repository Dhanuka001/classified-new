import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  reporterEmail: String,
  reporterPhone: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Report', reportSchema);

