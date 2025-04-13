import Ad from '../models/Ad.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js'


// 🔍 Get pending ads
export const getPendingAds = async (req, res) => {
  try {
    const ads = await Ad.find({ isApproved: false }).sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    console.error('Fetch pending ads error:', err.message);
    res.status(500).json({ message: 'Failed to load pending ads.' });
  }
};

// ✅ Approve / Reject + Set Promotion
export const setAdStatus = async (req, res) => {
  try {
    const { status, promotion } = req.body; // status = true/false

    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    ad.isApproved = status;
    if (promotion) ad.promotion = promotion;

    await ad.save();
    res.json({ message: `Ad ${status ? 'approved' : 'rejected'} successfully.`, ad });
  } catch (err) {
    console.error('Ad status update error:', err.message);
    res.status(500).json({ message: 'Failed to update ad status.' });
  }
};

// 🧭 Set Ad Page + Position
export const setAdPlacement = async (req, res) => {
  try {
    const { page, position } = req.body;

    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    ad.page = page || 'home';
    ad.position = position || 'middle';

    await ad.save();
    res.json({ message: 'Ad placement updated.', ad });
  } catch (err) {
    console.error('Placement update error:', err.message);
    res.status(500).json({ message: 'Failed to update placement.' });
  }
};

// ❌ Delete any ad (force)
export const deleteAnyAd = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found or already deleted.' });

    res.json({ message: 'Ad deleted by admin.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete ad.' });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};


export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isActive = req.body.isActive;
    await user.save();

    res.json({ message: `User ${req.body.isActive ? 'activated' : 'suspended'}.` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user status.' });
  }
};


export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'username email')
      .populate('adId', 'title')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};


