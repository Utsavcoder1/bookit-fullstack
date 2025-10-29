import PromoCode from '../models/PromoCode.js';

export const validatePromo = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;
    if (!code || totalAmount === undefined) {
      return res.status(400).json({ success: false, message: 'Promo code and total amount are required' });
    }

    const promo = await PromoCode.findOne({ code: code.toUpperCase().trim(), isActive: true });
    if (!promo) return res.status(400).json({ success: false, valid: false, message: 'Invalid promo code' });

    const now = new Date();
    if (now < promo.validFrom) return res.status(400).json({ success: false, valid: false, message: 'Promo code not yet active' });
    if (now > promo.validUntil) return res.status(400).json({ success: false, valid: false, message: 'Promo code expired' });
    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) return res.status(400).json({ success: false, valid: false, message: 'Promo code usage limit reached' });

    const amount = parseFloat(totalAmount);
    if (amount < promo.minAmount) return res.status(400).json({ success: false, valid: false, message: `Minimum amount $${promo.minAmount} required` });

    let discountAmount = 0;
    if (promo.discountType === 'percentage') {
      discountAmount = (amount * promo.discountValue) / 100;
      if (promo.maxDiscount && discountAmount > promo.maxDiscount) discountAmount = promo.maxDiscount;
    } else {
      discountAmount = Math.min(promo.discountValue, amount);
    }

    discountAmount = Math.round(discountAmount * 100) / 100;
    const finalAmount = amount - discountAmount;

    res.json({ success: true, valid: true, message: 'Promo code applied successfully', data: { discountAmount, finalAmount, promoCode: promo.code } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error validating promo code', error: error.message });
  }
};