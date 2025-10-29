import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  maxParticipants: { type: Number, required: true, default: 10 },
  bookedParticipants: { type: Number, default: 0 },
  price: { type: Number, required: true }
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 },
  slots: [slotSchema],
  included: [String],
  requirements: [String]
}, { timestamps: true });

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
export default Experience;