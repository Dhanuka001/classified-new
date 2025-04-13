import express from 'express';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';
import {
  getPendingAds,
  setAdStatus,
  setAdPlacement,
  deleteAnyAd
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, isAdmin);

router.get('/ads/pending', getPendingAds);
router.put('/ads/:id/status', setAdStatus);
router.put('/ads/:id/placement', setAdPlacement);
router.delete('/ads/:id', deleteAnyAd);

export default router;
