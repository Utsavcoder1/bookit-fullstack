import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Experience } from '../types';
import { apiService } from '../services/api';

const ExperienceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await apiService.getExperienceById(id);
        setExperience(data);
      } catch (err) {
        setError('Experience not found');
        console.error('Error fetching experience:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const handleBookNow = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    navigate(`/checkout/${id}?slot=${selectedSlot}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-gray-600 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          Loading experience details...
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">⚠️</div>
          <div className="text-red-600 mb-4">{error || 'Experience not found'}</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const selectedSlotData = experience.slots?.find(slot => slot._id === selectedSlot);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium mb-3 flex items-center text-sm"
          >
            ← Back to Experiences
          </button>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {experience.title}
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Column - Image and Details */}
          <div className="lg:flex-1">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg mb-4 sm:mb-6"
            />
            
            {/* Basic Info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              <div className="flex items-center">
                📍 {experience.location}
              </div>
              <div className="flex items-center">
                ⏱️ {experience.duration}
              </div>
              <div className="flex items-center">
                ⭐ {experience.rating} ({experience.reviewCount} reviews)
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {experience.description}
              </p>
            </div>

            {/* Included & Requirements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">What's Included</h3>
                <ul className="text-gray-700 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  {experience.included.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 sm:mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">What to Bring</h3>
                <ul className="text-gray-700 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  {experience.requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 sm:mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:w-80">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 sticky top-20">
              <div className="mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  ${experience.slots?.[0]?.price}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">per person</div>
              </div>

              {/* Date & Time Selection */}
              <div className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Select Date & Time</h3>
                <div className="space-y-2 sm:space-y-3">
                  {experience.slots?.map((slot) => (
                    <label
                      key={slot._id}
                      className={`flex items-start p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSlot === slot._id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${!slot.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        value={slot._id}
                        checked={selectedSlot === slot._id}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        disabled={!slot.isAvailable}
                        className="mt-0.5 mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {new Date(slot.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          {slot.startTime} - {slot.endTime}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {slot.isAvailable 
                            ? `${slot.availableSpots} spots left`
                            : 'Sold out'
                          }
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base ml-2">
                        ${slot.price}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBookNow}
                disabled={!selectedSlot}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors text-sm sm:text-base ${
                  selectedSlot
                    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Book Now
              </button>

              {selectedSlotData && (
                <div className="mt-3 text-xs sm:text-sm text-gray-600 text-center">
                  Total: ${selectedSlotData.price} × 1 person = ${selectedSlotData.price}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExperienceDetails;