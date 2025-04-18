import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// 🔐 Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      phoneNumber,
      password: hash,
    });

    // Create email verification token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const verifyLink = `${process.env.CLIENT_URL}/verify/${token}`;

    await sendEmail(email, 'Verify your SriAdz Account 💋', `
      <h2>Hey ${username},</h2>
      <p>Click below to verify your account:</p>
      <a href="${verifyLink}" style="padding: 10px 20px; background: #ff3399; color: white; text-decoration: none; border-radius: 6px;">Verify Now</a>
    `);

    res.status(201).json({ message: 'Registration successful. Check your email to verify.' });
  } catch (err) {
    console.error('Registration error:', err); // 
    res.status(500).json({ message: 'Server error' });
  }
  
};

// ✅ Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isVerified = true;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired verification link.' });
  }
};

// ✅ Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    if (!user.isVerified)
      return res.status(403).json({ message: 'Please verify your email before logging in' });

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'No account found with this email' });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(user.email, 'Reset Your Password', `
      <h3>Hi ${user.username},</h3>
      <p>Click below to reset your password. This link will expire in 15 minutes.</p>
      <a href="${resetLink}" style="padding: 10px 20px; background: #ff3399; color: white; text-decoration: none; border-radius: 6px;">Reset Password</a>
    `);

    res.json({ message: 'Reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const newPassword = await bcrypt.hash(req.body.password, 10);
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired reset link' });
  }
};
