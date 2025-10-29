import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Experience } from '../types';
import { apiService } from '../services/api';

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await apiService.getExperiences();
        setExperiences(data);
      } catch (err) {
        setError('Failed to load experiences');
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-gray-600 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          Loading experiences...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-red-600 text-center">
          <div className="text-xl mb-2">⚠️</div>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">BookIt</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Experiences</h2>
          <p className="text-gray-600 text-sm sm:text-base">Discover and book unique travel experiences</p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 active:scale-95"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs font-medium">
                  ⭐ {experience.rating} ({experience.reviewCount})
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                {/* Title and Location */}
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 line-clamp-2 leading-tight">
                  {experience.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center">
                  📍 {experience.location}
                </p>

                {/* Duration and Category */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <span className="flex items-center">
                    ⏱️ {experience.duration}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {experience.category}
                  </span>
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg sm:text-2xl font-bold text-gray-900">
                      ${experience.slots?.[0]?.price}
                    </span>
                    <span className="text-gray-600 text-xs sm:text-sm ml-1">/person</span>
                  </div>
                  <button
                    onClick={() => navigate(`/experience/${experience._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm transition-colors duration-200 active:bg-blue-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No experiences found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;