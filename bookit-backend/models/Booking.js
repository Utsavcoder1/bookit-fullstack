import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userInfo: {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true }
  },
  participants: { type: Number, required: true, min: 1, max: 20 },
  totalPrice: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true },
  promoCode: { type: String, default: null },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  bookingReference: { type: String, unique: true }
}, { timestamps: true });

bookingSchema.pre('save', async function(next) {
  if (!this.bookingReference) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.bookingReference = `BK-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;