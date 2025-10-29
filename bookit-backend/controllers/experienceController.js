import Experience from '../models/Experience.js';

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({})
      .select('title description image location category duration rating reviewCount slots.price')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: experiences, count: experiences.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching experiences', error: error.message });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    const enhancedSlots = experience.slots.map(slot => ({
      ...slot.toObject(),
      availableSpots: slot.maxParticipants - slot.bookedParticipants,
      isAvailable: (slot.maxParticipants - slot.bookedParticipants) > 0
    }));

    res.json({ success: true, data: { ...experience.toObject(), slots: enhancedSlots } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching experience', error: error.message });
  }
};