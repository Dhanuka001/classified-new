import Ad from '../models/Ad.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import { v2 as cloudinary } from 'cloudinary';

// 🔍 Get Pending Ads (with pagination and filters)
export const getPendingAds = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const query = { isApproved: false };
    if (category) query.category = category;

    const ads = await Ad.find(query)
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Ad.countDocuments(query);

    res.json({
      ads,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Fetch pending ads error:', err.message);
    res.status(500).json({ message: 'Failed to load pending ads.' });
  }
};

// ✅ Approve/Reject Ad (with promotion and feedback)
export const setAdStatus = async (req, res) => {
  try {
    const { isApproved, promotion, feedback } = req.body;

    if (typeof isApproved !== 'boolean') {
      return res.status(400).json({ message: 'isApproved must be true/false.' });
    }

    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found.' });

    ad.isApproved = isApproved;
    if (promotion && ['normal', 'super', 'vip', 'chatbox'].includes(promotion)) {
      ad.promotion = promotion;
    } else if (promotion) {
      return res.status(400).json({ message: 'Invalid promotion type.' });
    }
    if (feedback && !isApproved) {
      ad.feedback = feedback; // Store rejection reason
    }

    await ad.save();
    res.json({
      message: `Ad ${isApproved ? 'approved' : 'rejected'} successfully.`,
      ad,
    });
  } catch (err) {
    console.error('Ad status update error:', err.message);
    res.status(500).json({ message: 'Failed to update ad status.' });
  }
};

// ✅ Bulk Approve/Reject Ads
export const bulkSetAdStatus = async (req, res) => {
  try {
    const { adIds, isApproved, promotion, feedback } = req.body;

    if (!Array.isArray(adIds) || adIds.length === 0) {
      return res.status(400).json({ message: 'adIds must be a non-empty array.' });
    }
    if (typeof isApproved !== 'boolean') {
      return res.status(400).json({ message: 'isApproved must be true/false.' });
    }

    const updateData = { isApproved };
    if (promotion && ['normal', 'super', 'vip', 'chatbox'].includes(promotion)) {
      updateData.promotion = promotion;
    }
    if (feedback && !isApproved) {
      updateData.feedback = feedback;
    }

    const result = await Ad.updateMany(
      { _id: { $in: adIds } },
      { $set: updateData }
    );

    res.json({
      message: `Updated ${result.modifiedCount} ads successfully.`,
    });
  } catch (err) {
    console.error('Bulk ad status update error:', err.message);
    res.status(500).json({ message: 'Failed to update ads.' });
  }
};

// 🧭 Set Ad Placement
export const setAdPlacement = async (req, res) => {
  try {
    const { page, position } = req.body;

    const validPages = ['home', 'category'];
    const validPositions = ['top', 'middle', 'bottom'];

    if (page && !validPages.includes(page)) {
      return res.status(400).json({ message: 'Invalid page value.' });
    }
    if (position && !validPositions.includes(position)) {
      return res.status(400).json({ message: 'Invalid position value.' });
    }

    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found.' });

    ad.page = page || ad.page || 'home';
    ad.position = position || ad.position || 'middle';

    await ad.save();
    res.json({ message: 'Ad placement updated.', ad });
  } catch (err) {
    console.error('Placement update error:', err.message);
    res.status(500).json({ message: 'Failed to update placement.' });
  }
};

// ❌ Delete Ad (with Cloudinary cleanup)
export const deleteAnyAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found.' });

    // Delete image from Cloudinary
    if (ad.image) {
      const publicId = ad.image.split('/').slice(-1)[0].split('.')[0];
      await cloudinary.uploader.destroy(`ads_platform/${publicId}`);
    }

    await ad.deleteOne();
    res.json({ message: 'Ad deleted successfully.' });
  } catch (err) {
    console.error('Delete ad error:', err.message);
    res.status(500).json({ message: 'Failed to delete ad.' });
  }
};

// 🔍 Get All Users (with pagination and filters)
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;
    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Fetch users error:', err.message);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};

// ✅ Toggle User Status
export const toggleUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'isActive must be true/false.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (user.isAdmin && !isActive) {
      return res.status(403).json({ message: 'Cannot suspend an admin user.' });
    }

    user.isActive = isActive;
    await user.save();

    res.json({
      message: `User ${isActive ? 'activated' : 'suspended'}.`,
      user: { _id: user._id, username: user.username, isActive: user.isActive },
    });
  } catch (err) {
    console.error('User status update error:', err.message);
    res.status(500).json({ message: 'Failed to update user status.' });
  }
};

// 🔍 Get All Payments (with pagination and filters)
export const getAllPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate, adId } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    if (adId) query.adId = adId;

    const payments = await Payment.find(query)
      .populate('userId', 'username email')
      .populate('adId', 'title')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Payment.countDocuments(query);

    res.json({
      payments,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Fetch payments error:', err.message);
    res.status(500).json({ message: 'Failed to fetch payments.' });
  }
};