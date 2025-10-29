export interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  category: string;
  duration: string;
  rating: number;
  reviewCount: number;
  price?: number;
  slots?: Slot[];
  included: string[];
  requirements: string[];
}

export interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  maxParticipants: number;
  bookedParticipants: number;
  availableSpots: number;
  isAvailable: boolean;
}

export interface BookingData {
  experienceId: string;
  slotId: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  participants: number;
  promoCode?: string;
}

export interface PromoValidation {
  code: string;
  totalAmount: number | string; // Allow both number and string
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}