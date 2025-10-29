import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import experienceRoutes from '../routes/experienceRoutes.js';
import bookingRoutes from '../routes/bookingRoutes.js';
import promoRoutes from '../routes/promoRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BookIt API is running! 🚀',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});