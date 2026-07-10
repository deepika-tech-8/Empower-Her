// mobile/src/services/lessonService.js
import { AI_API_URL, API_KEY } from '@env';
import mockData from '../utils/mockData';

export const lessonService = {
  // Generate a micro-lesson using AI
  generateLesson: async (topic, level = 'beginner') => {
    try {
      const response = await fetch(`${AI_API_URL}/generate-lesson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          topic: topic,
          level: level,
          format: 'micro_lesson', // 3-7 min
        }),
      });
      
      if (!response.ok) throw new Error('AI generation failed');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI lesson generation failed:', error);
      // Fallback to seed content
      return getSeedLesson(topic);
    }
  },

  // Fallback: Seed content for cold-start
  getSeedLesson: async (topic) => {
    // In production, fetch from Firebase
    const seedLessons = mockData.seedLessons;
    return seedLessons[topic] || seedLessons.default;
  },

  // Break a topic into snack-sized chunks
  breakIntoSnacks: async (topic) => {
    try {
      const response = await fetch(`${AI_API_URL}/break-into-snacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          topic: topic,
          maxDuration: 7, // minutes per snack
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Snack breakdown failed:', error);
      return mockData.defaultSnackBreakdown;
    }
  },
};