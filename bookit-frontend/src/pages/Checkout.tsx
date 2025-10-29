import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import type { Experience, Slot } from '../types';
import { apiService } from '../services/api';

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const slotId = searchParams.get('slot');
  
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoLoading, setPromoLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id || !slotId) return;
      
      try {
        setLoading(true);
        const data = await apiService.getExperienceById(id);
        setExperience(data);
        
        const slot = data.slots?.find(s => s._id === slotId);
        setSelectedSlot(slot || null);
      } catch (err) {
        console.error('Error fetching experience:', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id, slotId, navigate]);

  const handlePromoApply = async () => {
    if (!promoCode || !selectedSlot) return;
    
    try {
      setPromoLoading(true);
      const totalAmount = selectedSlot.price * participants;
      const response = await apiService.validatePromoCode({
        code: promoCode,
        totalAmount
      });
      
      if (response.valid) {
        setDiscount(response.data.discountAmount);
      } else {
        alert(response.message);
        setPromoCode('');
      }
    } catch (err) {
      alert('Error applying promo code');
    } finally {
      setPromoLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!experience || !selectedSlot || !formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setBookingLoading(true);
      const bookingData = {
        experienceId: experience._id,
        slotId: selectedSlot._id,
        userInfo: formData,
        participants,
        promoCode: promoCode || undefined
      };

      const response = await apiService.createBooking(bookingData);
      
      if (response.success) {
        navigate('/result', { 
          state: { 
            success: true, 
            booking: response.data,
            experience: experience
          } 
        });
      } else {
        alert(response.message || 'Booking failed');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-gray-600 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          Loading checkout...
        </div>
      </div>
    );
  }

  if (!experience || !selectedSlot) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-red-600 text-center">
          <div className="text-xl mb-2">⚠️</div>
          Experience or slot not found
        </div>
      </div>
    );
  }

  const subtotal = selectedSlot.price * participants;
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <button 
            onClick={() => navigate(`/experience/${id}`)}
            className="text-blue-600 hover:text-blue-700 font-medium mb-3 flex items-center text-sm"
          >
            ← Back to Experience
          </button>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:flex-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Booking Details</h2>
              
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">{experience.location}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {new Date(selectedSlot.date).toLocaleDateString()} • {selectedSlot.startTime} - {selectedSlot.endTime}
                  </p>
                </div>
              </div>

              {/* Participants */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Participants
                </label>
                <select
                  value={participants}
                  onChange={(e) => setParticipants(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[...Array(selectedSlot.availableSpots)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Promo Code */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handlePromoApply}
                    disabled={!promoCode || promoLoading}
                    className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {promoLoading ? '...' : 'Apply'}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Contact Information</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:w-80 mt-6 lg:mt-0">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 sticky top-20">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Price Summary</h2>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    ${selectedSlot.price} × {participants} {participants === 1 ? 'person' : 'people'}
                  </span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Discount</span>
                    <span>-${discount}</span>
                  </div>
                )}
                
                <div className="border-t pt-2 sm:pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingLoading || !formData.name || !formData.email || !formData.phone}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed active:bg-blue-800"
              >
                {bookingLoading ? 'Processing...' : 'Complete Booking'}
              </button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                By completing this booking, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;