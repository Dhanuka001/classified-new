import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import connectDB from './config/db.js';
import cors from 'cors';

import authRoutes from './routes/AuthRoutes.js';
import adRoutes from './routes/adRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';


dotenv.config();
const app = express();


app.use('/uploads', express.static('uploads'));


// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/payments', paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅Server running on port ${PORT}`);
});
