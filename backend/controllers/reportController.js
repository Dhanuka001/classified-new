import Report from '../models/Report.js';
import Ad from '../models/Ad.js';

// Create a new report
export const createReport = async (req, res) => {
  try {
    const { adId, message } = req.body;

    if (!adId || !message.trim()) {
      return res.status(400).json({ message: 'Ad ID and message are required.' });
    }

    // Check if ad exists
    const adExists = await Ad.findById(adId);
    if (!adExists) {
      return res.status(404).json({ message: 'Ad not found.' });
    }

    const report = await Report.create({ adId, message });
    res.status(201).json({ message: 'Ad reported successfully.', report });
  } catch (err) {
    console.error('Create report error:', err.message);
    res.status(500).json({ message: 'Failed to submit report.' });
  }
};

// Admin - Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('adId');
    res.status(200).json(reports);
  } catch (err) {
    console.error('Get reports error:', err.message);
    res.status(500).json({ message: 'Failed to load reports.' });
  }
};
