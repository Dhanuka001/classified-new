import Ad from '../models/Ad.js';
import Payment from '../models/Payment.js';
import upload from '../middleware/multer.js';

// ✅ Create Ad
export const createAd = [
  upload.fields([{ name: 'image', maxCount: 1 }]),
  async (req, res) => {
    try {
      const {
        category,
        title,
        description,
        location,
        phone,
        whatsapp,
        telegram,
        promotion,
        cashbackGuarantee,
        page,
        position,
      } = req.body;

      // Validations
      if (!category || !['live-cam', 'girls-personal', 'spa', 'shemale'].includes(category)) {
        return res.status(400).json({ message: '📋 Valid category is required.' });
      }
      if (!title || !title.trim()) {
        return res.status(400).json({ message: '📝 Title is required.' });
      }
      if (!description || !description.trim()) {
        return res.status(400).json({ message: '📝 Description is required.' });
      }
      if (!phone || !/^\+?\d{10,12}$/.test(phone)) {
        return res.status(400).json({ message: '📞 Valid phone number is required.' });
      }
      if (!req.files?.image) {
        return res.status(400).json({ message: '🖼️ Ad image is required.' });
      }
      if (!promotion || !['normal', 'super', 'vip', 'chatbox'].includes(promotion)) {
        return res.status(400).json({ message: 'Invalid ad type.' });
      }

      const ad = await Ad.create({
        category,
        title,
        description,
        location: location || '',
        image: req.files.image[0].path, // Cloudinary URL
        phone,
        whatsapp: whatsapp || '',
        telegram: telegram || '',
        promotion,
        cashbackGuarantee: cashbackGuarantee === 'true',
        page: page || 'home',
        position: position || 'top',
        createdBy: req.user._id,
        isApproved: req.user.role === 'admin',
      });

      res.status(201).json({ message: '✅ Ad created successfully.', ad });
    } catch (err) {
      console.error('Ad creation error:', err.message);
      res.status(500).json({ message: '❌ Something went wrong' });
    }
  },
];

// ✅ Submit Payment
export const submitPayment = [
  upload.fields([{ name: 'bankSlip', maxCount: 1 }]),
  async (req, res) => {
    try {
      const { adId, amount, referenceNote } = req.body;

      if (!adId) return res.status(400).json({ message: 'Ad ID required.' });
      if (!req.files.bankSlip) return res.status(400).json({ message: '📄 Bank slip is required.' });
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: '💰 Valid payment amount is required.' });
      }

      const orderId = `#SZ${Math.floor(100000 + Math.random() * 900000)}`;

      const payment = await Payment.create({
        orderId,
        adId,
        userId: req.user._id,
        amount: parseFloat(amount),
        referenceNote: referenceNote || '',
        bankSlip: req.files.bankSlip[0].path, // Cloudinary URL
      });

      res.status(201).json({
        message: '🎉 Payment submitted. Waiting for approval.',
        orderId,
      });
    } catch (err) {
      console.error('Payment creation error:', err.message);
      res.status(500).json({ message: '❌ Failed to submit payment.' });
    }
  },
];

// ✅ Get All Approved Ads (Public)
export const getAllAds = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category
      ? { category, isApproved: true }
      : { isApproved: true };
    const ads = await Ad.find(query).sort({ createdAt: -1 });
    res.status(200).json(ads);
  } catch (err) {
    console.error('Get all ads error:', err.message);
    res.status(500).json({ message: '❌ Failed to fetch ads. Please try again later.' });
  }
};

// ✅ Get User’s Own Ads
export const getMyAds = async (req, res) => {
  try {
    const ads = await Ad.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(ads);
  } catch (err) {
    console.error('Get user ads error:', err.message);
    res.status(500).json({ message: '❌ Failed to fetch your ads. Please try again.' });
  }
};

// ✅ Update Ad
export const updateAd = async (req, res) => {
  try {
    const { category, title, description, location } = req.body;

    if (!category || !['live-cam', 'girls-personal', 'spa', 'shemale'].includes(category)) {
      return res.status(400).json({ message: '📋 Invalid category.' });
    }
    if (!title || !title.trim()) {
      return res.status(400).json({ message: '📝 Title is required.' });
    }

    const ad = await Ad.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!ad) {
      return res.status(404).json({ message: '❌ Ad not found or you do not have permission.' });
    }

    ad.title = title;
    ad.description = description;
    ad.location = location || '';
    ad.category = category;

    // ✅ If new image is uploaded, update it
    if (req.file) {
      ad.image = req.file.path; // Already uploaded to Cloudinary by multer middleware
    }

    await ad.save();

    res.status(200).json({
      message: '✅ Your ad was updated successfully.',
      updatedAd: ad,
    });
  } catch (err) {
    console.error('Update ad error:', err.message);
    res.status(500).json({ message: '❌ Failed to update ad. Try again later.' });
  }
};


// ✅ Delete Ad
export const deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });

    if (!ad) {
      return res.status(404).json({ message: '❌ Ad not found or already deleted.' });
    }

    res.status(200).json({ message: '🗑️ Ad deleted successfully.' });
  } catch (err) {
    console.error('Delete ad error:', err.message);
    res.status(500).json({ message: '❌ Failed to delete ad. Try again later.' });
  }
};

// ✅ Get Single Ad
export const getSingleAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad || !ad.isApproved) {
      return res.status(404).json({ message: '❌ Ad not found or not approved yet.' });
    }

    res.status(200).json(ad);
  } catch (err) {
    console.error('Get single ad error:', err.message);
    res.status(500).json({ message: '❌ Failed to load ad. Please try again.' });
  }
};