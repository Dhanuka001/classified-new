import express from 'express';
import {
  createAd,
  getAllAds,
  getMyAds,
  updateAd,
  deleteAd,
  getSingleAd,
  submitPayment
} from '../controllers/adController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Protected
router.post('/', protect, createAd);
router.get('/mine', protect, getMyAds);
router.put('/:id', protect, upload.single('image'),updateAd);
router.delete('/:id', protect, deleteAd);
router.post('/payment', protect, submitPayment);

// Public
router.get('/', getAllAds);
router.get('/:id', getSingleAd);



export default router;
