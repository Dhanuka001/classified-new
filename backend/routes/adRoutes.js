import express from 'express';
import {
  createAd,
  getAllAds,
  getMyAds,
  updateAd,
  deleteAd,
  getSingleAd
} from '../controllers/adController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected
router.post('/', protect, createAd);
router.get('/mine', protect, getMyAds);
router.put('/:id', protect, updateAd);
router.delete('/:id', protect, deleteAd);

// Public
router.get('/', getAllAds);
router.get('/:id', getSingleAd);



export default router;
