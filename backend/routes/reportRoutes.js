import express from 'express';
import { createReport, getAllReports } from '../controllers/reportController.js';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// 📥 User submit report
router.post('/:id/report', createReport);

// 👮 Admin view all reports
router.get('/admin/all', protect, isAdmin, getAllReports);

export default router;
