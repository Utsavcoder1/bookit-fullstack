import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Experience } from '../types';

interface BookingResult {
  success: boolean;
  booking: any;
  experience: Experience;
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state as BookingResult;

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-red-600 text-center">
          <div className="text-xl mb-2">⚠️</div>
          Invalid booking result
        </div>
      </div>
    );
  }

  const { success, booking, experience } = result;

  if (!success) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Booking Failed</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 sm:py-16 text-center">
          <div className="text-red-500 text-4xl sm:text-6xl mb-4">❌</div>
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Booking Unsuccessful
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
            We're sorry, but your booking could not be completed. Please try again or contact support.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-sm sm:text-base w-full sm:w-auto"
          >
            Back to Experiences
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Booking Confirmed</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {/* Success Message */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-green-500 text-4xl sm:text-6xl mb-3 sm:mb-4">✅</div>
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Your booking has been successfully completed.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Booking Details</h3>
          
          <div className="space-y-2 sm:space-y-4 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking Reference:</span>
              <span className="font-medium text-right">{booking.bookingReference}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-medium text-right">{experience.title}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{experience.location}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium text-right text-xs sm:text-sm">
                {new Date(booking.createdAt).toLocaleDateString()} • Selected time
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Participants:</span>
              <span className="font-medium">{booking.participants}</span>
            </div>
            
            <div className="flex justify-between border-t pt-2 sm:pt-3">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-medium text-base sm:text-lg text-green-600">
                ${booking.finalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Customer Information</h3>
          
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{booking.userInfo.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{booking.userInfo.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{booking.userInfo.phone}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">What's Next?</h3>
          <ul className="text-blue-800 space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li>• You will receive a confirmation email shortly</li>
            <li>• Please arrive 15 minutes before your scheduled time</li>
            <li>• Bring your booking reference and ID</li>
            <li>• Contact us if you have any questions</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-sm sm:text-base active:bg-blue-800"
          >
            Book Another Experience
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg text-sm sm:text-base active:bg-gray-800"
          >
            Print Confirmation
          </button>
        </div>
      </main>
    </div>
  );
};

export default Result;