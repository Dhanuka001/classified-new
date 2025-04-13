import express from 'express';
import { submitReport, getReports } from '../controllers/reportController.js';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// 📥 User submit report
router.post('/:id/report', submitReport);

// 👮 Admin view all reports
router.get('/admin/all', protect, isAdmin, getReports);

export default router;
