import { mockDataLessons } from '../utils/mockData';

export const gradingService = {
  async gradeTask(lessonId, userAnswer) {
    try {
      // Point directly to Backend API Functions (emulated fallback here for local offline consistency)
      const response = await fetch('https://us-central1-elevateher-learn.cloudfunctions.net/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, userAnswer })
      });

      if (!response.ok) throw new Error("API call returned failure status");
      return await response.json();
    } catch (error) {
      console.warn("AI grading API offline, routing to local string-matching heuristics", error);
      
      const cleanAnswer = userAnswer.trim().replace(/\s+/g, '').toLowerCase();
      if (lessonId === 'excel_vlookup' && cleanAnswer === '3') {
        return {
          passed: true,
          score: '10/10',
          response: 'Excellent! You successfully extracted matching items from column index 3. Your core layout comprehension is very strong.'
        };
      }
      
      return {
        passed: false,
        score: '5/10',
        response: 'Encouraging Try! Take another look at the target column positioning. Think about how many index columns you offset from Column A.'
      };
    }
  }
};