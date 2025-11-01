import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import PromoCode from '../models/PromoCode.js';
import dotenv from 'dotenv';

dotenv.config();

// Function to generate 100 slots for 2026
const generateSlots = (basePrice, timeSlots) => {
  const slots = [];
  const startDate = new Date('2026-01-01');
  
  for (let i = 0; i < 100; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const timeSlot = timeSlots[i % timeSlots.length];
    const maxParticipants = [10, 12, 15, 20, 25][i % 5]; // Vary participant limits
    const bookedParticipants = Math.floor(Math.random() * (maxParticipants * 0.7)); // Random bookings
    
    slots.push({
      date: currentDate,
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      maxParticipants: maxParticipants,
      bookedParticipants: bookedParticipants,
      price: basePrice
    });
  }
  
  return slots;
};

// Different time slots for variety
const timeSlots = [
  { start: "06:00", end: "08:00" },
  { start: "08:00", end: "10:00" },
  { start: "09:00", end: "12:00" },
  { start: "10:00", end: "13:00" },
  { start: "14:00", end: "16:00" },
  { start: "15:00", end: "18:00" },
  { start: "17:00", end: "20:00" },
  { start: "18:00", end: "21:00" }
];

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
    slots: generateSlots(89, timeSlots)
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
    slots: generateSlots(120, timeSlots)
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
    slots: generateSlots(75, timeSlots)
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
    slots: generateSlots(200, timeSlots)
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
    slots: generateSlots(95, timeSlots)
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
    slots: generateSlots(85, timeSlots)
  }
];

const samplePromoCodes = [
  {
    code: "SAVE10",
    discountType: "percentage",
    discountValue: 10,
    minAmount: 50,
    maxDiscount: 50,
    validFrom: new Date('2026-01-01'),
    validUntil: new Date('2026-12-31'),
    usageLimit: 100,
    usedCount: 25,
    isActive: true
  },
  {
    code: "FLAT100",
    discountType: "fixed",
    discountValue: 100,
    minAmount: 200,
    validFrom: new Date('2026-01-01'),
    validUntil: new Date('2026-12-30'),
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
    validFrom: new Date('2026-01-01'),
    validUntil: new Date('2026-12-31'),
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
    validFrom: new Date('2026-06-01'),
    validUntil: new Date('2026-08-31'),
    usageLimit: 75,
    usedCount: 0,
    isActive: true
  },
  {
    code: "FIRST5",
    discountType: "fixed",
    discountValue: 5,
    minAmount: 20,
    validFrom: new Date('2026-01-01'),
    validUntil: new Date('2026-12-31'),
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
    
    // Calculate total slots
    const totalSlots = experiences.reduce((sum, exp) => sum + exp.slots.length, 0);
    console.log(`   Total Slots: ${totalSlots}`);
    
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