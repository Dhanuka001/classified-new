import Report from '../models/Report.js';
import Ad from '../models/Ad.js';

// 🔘 Submit a report
export const submitReport = async (req, res) => {
  try {
    const { reason, reporterEmail, reporterPhone } = req.body;
    const { id: adId } = req.params;

    const ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    const report = await Report.create({
      adId,
      reason,
      reporterEmail,
      reporterPhone
    });

    res.status(201).json({ message: '🛡️ Report submitted successfully. Thank you!', report });
  } catch (err) {
    console.error('Report error:', err.message);
    res.status(500).json({ message: '❌ Failed to submit report' });
  }
};

// 👮 Admin View Reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('adId').sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error('Fetch reports error:', err.message);
    res.status(500).json({ message: '❌ Failed to load reports' });
  }
};
