import axios from 'axios';
import type { Experience, BookingData, PromoValidation } from '../types';

// Use environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bookit-fullstack-1o0q.onrender.com';

console.log('API Base URL:', API_BASE_URL); // Debug log

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.url);
    return config;
  },
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API response error:', error);
    if (error.code === 'ECONNREFUSED') {
      alert('Cannot connect to server. Please check if backend is running.');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Get all experiences
  getExperiences: async (): Promise<Experience[]> => {
    try {
      const response = await api.get('/experiences');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  // Get experience by ID
  getExperienceById: async (id: string): Promise<Experience> => {
    try {
      const response = await api.get(`/experiences/${id}`);
      if (!response.data.data) {
        throw new Error('Experience not found');
      }
      return response.data.data;
    } catch (error) {
      console.error('Error fetching experience:', error);
      throw error;
    }
  },

  // Validate promo code
  validatePromoCode: async (data: PromoValidation): Promise<any> => {
    try {
      const response = await api.post('/promo/validate', {
        code: data.code,
        totalAmount: parseFloat(data.totalAmount.toString())
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Create booking
  createBooking: async (data: BookingData): Promise<any> => {
    try {
      const response = await api.post('/bookings', data);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },
};

export default api;