import express from 'express';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';
import {
  getPendingAds,
  setAdStatus,
  bulkSetAdStatus,
  setAdPlacement,
  deleteAnyAd,
  getAllUsers,
  toggleUserStatus,
  getAllPayments,
} from '../controllers/adminController.js';

const router = express.Router();

// Apply protect and isAdmin middleware to all routes
router.use(protect, isAdmin);

// Ads Management
router.get('/ads/pending', getPendingAds); // Get pending ads with pagination
router.put('/ads/:id/status', setAdStatus); // Approve/reject single ad
router.post('/ads/bulk-status', bulkSetAdStatus); // Bulk approve/reject ads
router.put('/ads/:id/placement', setAdPlacement); // Set ad page/position
router.delete('/ads/:id', deleteAnyAd); // Delete ad with Cloudinary cleanup

// Users Management
router.get('/users', getAllUsers); // Get all users with pagination and filters
router.put('/users/:id/status', toggleUserStatus); // Toggle user active status

// Payments Management
router.get('/payments', getAllPayments); // Get all payments with pagination and filters

export default router;