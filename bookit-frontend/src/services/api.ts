import axios from 'axios';
import type { Experience, BookingData, PromoValidation } from '../types';

const API_BASE_URL = 'https://bookit-fullstack-1o0q.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Get all experiences
  getExperiences: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return response.data.data || [];
  },

  // Get experience by ID
  getExperienceById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    if (!response.data.data) {
      throw new Error('Experience not found');
    }
    return response.data.data;
  },

  // Validate promo code - FIXED VERSION
  validatePromoCode: async (data: PromoValidation): Promise<any> => {
    try {
      const response = await api.post('/promo/validate', {
        code: data.code,
        totalAmount: parseFloat(data.totalAmount.toString()) // Ensure it's a number
      });
      return response.data;
    } catch (error: any) {
      // Return the error response from server
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Create booking
  createBooking: async (data: BookingData): Promise<any> => {
    const response = await api.post('/bookings', data);
    return response.data;
  },
};

export default api;