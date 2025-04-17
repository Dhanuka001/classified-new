import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ads_platform', // Store files in 'ads_platform' folder
    allowed_formats: ['jpg', 'jpeg', 'png'],
    resource_type: 'auto', // Detect file type (image for ads, raw for bank slips)
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`, // Unique ID
  },
});

// Multer setup
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase());
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only images (jpg, jpeg, png) or PDFs (for bank slips) allowed!'));
  },
});

export default upload;