import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true, min: 0 },
  minAmount: { type: Number, default: 0 },
  maxDiscount: { type: Number, default: null },
  validFrom: { type: Date, required: true, default: Date.now },
  validUntil: { type: Date, required: true },
  usageLimit: { type: Number, default: null },
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const PromoCode = mongoose.models.PromoCode || mongoose.model('PromoCode', promoSchema);
export default PromoCode;