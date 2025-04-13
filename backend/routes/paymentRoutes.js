import express from 'express';
import { protect } from '../middleware/auth.js';
import { storePayment } from '../controllers/paymentController.js';

const router = express.Router();

// 💸 Store payment after ad post
router.post('/', protect, storePayment);

export default router;
