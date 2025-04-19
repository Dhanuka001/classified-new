import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Report', reportSchema);
