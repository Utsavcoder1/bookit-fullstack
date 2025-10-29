import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import PromoCode from '../models/PromoCode.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleExperiences = [
  {
    title: "Sunset Cruise in Santorini",
    description: "Enjoy a breathtaking sunset while cruising around the caldera of Santorini with premium drinks and snacks. Perfect for couples and photographers seeking unforgettable moments.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Santorini, Greece",
    category: "Boat Tour",
    duration: "3 hours",
    rating: 4.8,
    reviewCount: 124,
    included: ["Welcome drink", "Greek snacks", "Professional photographer", "Multilingual guide", "Safety equipment"],
    requirements: ["Swimwear", "Sunscreen", "Camera", "Comfortable shoes", "Jacket for evening"],
    slots: [
      { date: new Date('2024-02-20'), startTime: "17:00", endTime: "20:00", maxParticipants: 20, bookedParticipants: 8, price: 89 },
      { date: new Date('2024-02-21'), startTime: "17:00", endTime: "20:00", maxParticipants: 20, bookedParticipants: 3, price: 89 },
      { date: new Date('2024-02-22'), startTime: "17:00", endTime: "20:00", maxParticipants: 20, bookedParticipants: 15, price: 89 }
    ]
  },
  {
    title: "Mountain Hiking Adventure",
    description: "Challenge yourself with this guided hiking tour through scenic mountain trails with panoramic views of the Swiss Alps. Suitable for intermediate hikers with moderate fitness levels.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Swiss Alps, Switzerland",
    category: "Adventure",
    duration: "6 hours",
    rating: 4.9,
    reviewCount: 89,
    included: ["Professional mountain guide", "Hiking equipment rental", "Gourmet lunch pack", "Round-trip transportation", "First aid kit"],
    requirements: ["Hiking shoes", "2L water bottle", "Warm clothing layers", "25L backpack", "Energy snacks"],
    slots: [
      { date: new Date('2024-02-22'), startTime: "08:00", endTime: "14:00", maxParticipants: 15, bookedParticipants: 5, price: 120 },
      { date: new Date('2024-02-23'), startTime: "08:00", endTime: "14:00", maxParticipants: 15, bookedParticipants: 12, price: 120 },
      { date: new Date('2024-02-24'), startTime: "08:00", endTime: "14:00", maxParticipants: 15, bookedParticipants: 2, price: 120 }
    ]
  },
  {
    title: "Wine Tasting Tour in Tuscany",
    description: "Explore authentic Tuscan vineyards and taste premium wines with expert sommeliers. Learn about wine production techniques and perfect food pairings in the heart of Italian wine country.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Tuscany, Italy",
    category: "Food & Drink",
    duration: "4 hours",
    rating: 4.7,
    reviewCount: 203,
    included: ["6 wine tastings", "Vineyard and cellar tour", "Expert sommelier guide", "Italian cheese and charcuterie platter", "Round-trip transportation"],
    requirements: ["ID for age verification", "Comfortable walking shoes", "Sun hat in summer"],
    slots: [
      { date: new Date('2024-02-24'), startTime: "14:00", endTime: "18:00", maxParticipants: 12, bookedParticipants: 2, price: 75 },
      { date: new Date('2024-02-25'), startTime: "14:00", endTime: "18:00", maxParticipants: 12, bookedParticipants: 7, price: 75 },
      { date: new Date('2024-02-26'), startTime: "14:00", endTime: "18:00", maxParticipants: 12, bookedParticipants: 0, price: 75 }
    ]
  },
  
  {
    title: "Hot Air Balloon Ride",
    description: "Soar above beautiful landscapes in a serene hot air balloon ride. Experience breathtaking views and unforgettable memories from the sky.",
    image: "https://images.unsplash.com/photo-1503177847378-d2048487fa46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Cappadocia, Turkey",
    category: "Adventure",
    duration: "2 hours",
    rating: 4.9,
    reviewCount: 278,
    included: ["Balloon ride", "Champagne toast", "Certificate of flight", "Photos", "Transportation"],
    requirements: ["Warm clothing", "Camera", "Comfortable shoes"],
    slots: [
      { date: new Date('2024-02-27'), startTime: "06:00", endTime: "08:00", maxParticipants: 16, bookedParticipants: 12, price: 200 },
      { date: new Date('2024-02-28'), startTime: "06:00", endTime: "08:00", maxParticipants: 16, bookedParticipants: 5, price: 200 }
    ]
  },
  {
    title: "Scuba Diving for Beginners",
    description: "Discover the underwater world with professional instructors. Perfect for first-time divers in crystal clear waters with abundant marine life.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Bali, Indonesia",
    category: "Water Sports",
    duration: "4 hours",
    rating: 4.7,
    reviewCount: 189,
    included: ["Equipment rental", "Professional instructor", "Underwater photos", "Refreshments", "Safety briefing"],
    requirements: ["Swimwear", "Towel", "No diving experience needed"],
    slots: [
      { date: new Date('2024-02-26'), startTime: "09:00", endTime: "13:00", maxParticipants: 6, bookedParticipants: 2, price: 95 },
      { date: new Date('2024-02-27'), startTime: "09:00", endTime: "13:00", maxParticipants: 6, bookedParticipants: 4, price: 95 }
    ]
  },
  {
    title: "Desert Safari Experience",
    description: "Experience the thrill of dune bashing, camel riding, and traditional Bedouin culture in the heart of the desert with a spectacular sunset view.",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Dubai, UAE",
    category: "Adventure",
    duration: "6 hours",
    rating: 4.6,
    reviewCount: 421,
    included: ["Dune bashing", "Camel ride", "BBQ dinner", "Belly dance show", "Henna painting"],
    requirements: ["Comfortable clothing", "Sunglasses", "Camera"],
    slots: [
      { date: new Date('2024-02-28'), startTime: "15:00", endTime: "21:00", maxParticipants: 25, bookedParticipants: 18, price: 85 },
      { date: new Date('2024-02-29'), startTime: "15:00", endTime: "21:00", maxParticipants: 25, bookedParticipants: 7, price: 85 }
    ]
  }
];

const samplePromoCodes = [
  {
    code: "SAVE10",
    discountType: "percentage",
    discountValue: 10,
    minAmount: 50,
    maxDiscount: 50,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 100,
    usedCount: 25,
    isActive: true
  },
  {
    code: "FLAT100",
    discountType: "fixed",
    discountValue: 100,
    minAmount: 200,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-30'),
    usageLimit: 50,
    usedCount: 12,
    isActive: true
  },
  {
    code: "WELCOME15",
    discountType: "percentage",
    discountValue: 15,
    minAmount: 100,
    maxDiscount: 75,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 200,
    usedCount: 89,
    isActive: true
  },
  {
    code: "SUMMER20",
    discountType: "percentage",
    discountValue: 20,
    minAmount: 150,
    maxDiscount: 100,
    validFrom: new Date('2024-06-01'),
    validUntil: new Date('2025-08-31'),
    usageLimit: 75,
    usedCount: 0,
    isActive: true
  },
  {
    code: "FIRST5",
    discountType: "fixed",
    discountValue: 5,
    minAmount: 20,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 1000,
    usedCount: 234,
    isActive: true
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Experience.deleteMany({});
    await PromoCode.deleteMany({});

    const experiences = await Experience.insertMany(sampleExperiences);
    const promoCodes = await PromoCode.insertMany(samplePromoCodes);

    console.log('✅ Sample data seeded successfully');
    
    console.log('\n📊 Data Summary:');
    console.log(`   Experiences: ${experiences.length}`);
    console.log(`   Promo Codes: ${promoCodes.length}`);
    
    console.log('\n💰 Promo Codes Available:');
    promoCodes.forEach(promo => {
      console.log(`   ${promo.code}: ${promo.discountValue}${promo.discountType === 'percentage' ? '%' : '$'} off (Min: $${promo.minAmount})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();