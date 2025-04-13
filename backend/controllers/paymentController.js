import Payment from '../models/Payment.js';

export const storePayment = async (req, res) => {
  try {
    const { adId, amount, referenceNote } = req.body;

    const orderId = `#SZ${Math.floor(100000 + Math.random() * 900000)}`;

    const payment = await Payment.create({
      adId,
      userId: req.user._id,
      amount,
      orderId,
      referenceNote,
    });

    res.status(201).json({ message: '💰 Payment recorded successfully', payment });
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to record payment' });
  }
};
