import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';
import PromoCode from '../models/PromoCode.js';

const validatePromoCode = async (code, totalAmount) => {
  const promo = await PromoCode.findOne({ code: code.toUpperCase().trim(), isActive: true });
  if (!promo) return { valid: false, message: 'Invalid promo code' };

  const now = new Date();
  if (now < promo.validFrom) return { valid: false, message: 'Promo code not yet active' };
  if (now > promo.validUntil) return { valid: false, message: 'Promo code expired' };
  if (promo.usageLimit && promo.usedCount >= promo.usageLimit) return { valid: false, message: 'Promo code usage limit reached' };
  if (totalAmount < promo.minAmount) return { valid: false, message: `Minimum amount $${promo.minAmount} required` };

  let discountAmount = 0;
  if (promo.discountType === 'percentage') {
    discountAmount = (totalAmount * promo.discountValue) / 100;
    if (promo.maxDiscount && discountAmount > promo.maxDiscount) discountAmount = promo.maxDiscount;
  } else {
    discountAmount = Math.min(promo.discountValue, totalAmount);
  }

  return { valid: true, discountAmount: Math.round(discountAmount * 100) / 100, promoData: promo };
};

export const createBooking = async (req, res) => {
  try {
    const { experienceId, slotId, userInfo, participants, promoCode } = req.body;

    if (!experienceId || !slotId || !userInfo || !participants) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ success: false, message: 'Experience not found' });

    const slot = experience.slots.id(slotId);
    if (!slot) return res.status(404).json({ success: false, message: 'Slot not found' });

    const availableSpots = slot.maxParticipants - slot.bookedParticipants;
    if (availableSpots < participants) {
      return res.status(400).json({ success: false, message: `Only ${availableSpots} spots available` });
    }

    let basePrice = slot.price * participants;
    let discountAmount = 0;
    let finalPrice = basePrice;
    let validatedPromoCode = null;
    let promoValidation = null;

    if (promoCode) {
      promoValidation = await validatePromoCode(promoCode, basePrice);
      if (!promoValidation.valid) return res.status(400).json({ success: false, message: promoValidation.message });
      discountAmount = promoValidation.discountAmount;
      finalPrice = basePrice - discountAmount;
      validatedPromoCode = promoCode.toUpperCase().trim();
    }

    const booking = new Booking({ experienceId, slotId, userInfo, participants, totalPrice: basePrice, discountAmount, finalPrice, promoCode: validatedPromoCode });
    await booking.save();

    slot.bookedParticipants += participants;
    await experience.save();

    if (validatedPromoCode && promoValidation.promoData) {
      await PromoCode.findByIdAndUpdate(promoValidation.promoData._id, { $inc: { usedCount: 1 } });
    }

    res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating booking', error: error.message });
  }
};