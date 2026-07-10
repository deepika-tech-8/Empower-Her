// mobile/src/services/gradingService.js
import { AI_API_URL, API_KEY } from '@env';

export const gradingService = {
  // Grade a practice task
  gradeTask: async (task, userAnswer) => {
    try {
      const response = await fetch(`${AI_API_URL}/grade-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          task: task,
          userAnswer: userAnswer,
          rubric: task.rubric || getDefaultRubric(),
        }),
      });
      
      if (!response.ok) throw new Error('Grading failed');
      
      const result = await response.json();
      return {
        score: result.score,
        feedback: result.feedback,
        missing: result.missing || [],
        explanation: result.explanation,
      };
    } catch (error) {
      console.error('AI grading failed:', error);
      // Fallback: manual/rule-based grading
      return fallbackGrading(task, userAnswer);
    }
  },

  // Flag a score for human review
  flagScore: async (lessonId, userId, reason) => {
    try {
      await fetch(`${API_BASE}/flag-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          lessonId,
          userId,
          reason,
          timestamp: new Date().toISOString(),
        }),
      });
      
      return { success: true, message: 'Score flagged for review' };
    } catch (error) {
      console.error('Flagging failed:', error);
      return { success: false, error: error.message };
    }
  },
};

// Fallback grading when AI fails
const fallbackGrading = (task, userAnswer) => {
  // Simple keyword-based grading
  const keywords = task.keywords || [];
  const found = keywords.filter(kw => userAnswer.toLowerCase().includes(kw.toLowerCase()));
  const score = Math.min(10, Math.round((found.length / keywords.length) * 10));
  
  return {
    score: score,
    feedback: score >= 7 
      ? "Good work