// mobile/src/services/aiService.js
// Complete AI Service with working API integration

// Import API key from .env
import { OPENAI_API_KEY } from '@env';

const API_URL = 'https://api.openai.com/v1/chat/completions';

// Generate a micro-lesson on any topic
export const generateLesson = async (topic, skill = 'Excel') => {
  // If no API key, use fallback
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.log('No API key found. Using fallback data.');
    return getFallbackLesson(topic);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a friendly, encouraging tutor for women learning ${skill}. 
            Create a 5-minute micro-lesson on "${topic}" with:
            1. A title
            2. 3 short concepts (each 2-3 sentences)
            3. A practice task with clear instructions
            4. A list of keywords to check in answers
            Be warm, encouraging, and avoid jargon. Use emojis occasionally.
            Format your response as JSON with keys: title, concepts (array of {title, body}), task {description, keywords}.`
          },
          {
            role: 'user',
            content: `Create a micro-lesson on "${topic}" for ${skill} beginners. Return ONLY valid JSON.`
          }
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Try to parse JSON response
    try {
      const parsed = JSON.parse(content);
      return {
        id: `lesson_${Date.now()}`,
        title: parsed.title || `${topic} Explained`,
        skill: skill,
        level: 'beginner',
        duration: '5 min',
        concepts: parsed.concepts || [
          { title: 'What is this?', body: `Introduction to ${topic}.` },
          { title: 'How to use it', body: `Basic usage of ${topic}.` },
          { title: 'Practice', body: `Try using ${topic} in a simple exercise.` }
        ],
        task: parsed.task || {
          description: `Practice using ${topic} with a simple exercise.`,
          keywords: [topic.toLowerCase(), 'practice'],
        },
        source: 'AI',
      };
    } catch (parseError) {
      // If JSON parsing fails, use the raw response
      return parseRawContent(content, topic, skill);
    }
  } catch (error) {
    console.error('AI lesson generation failed:', error);
    return getFallbackLesson(topic);
  }
};

// Parse raw content if JSON parsing fails
const parseRawContent = (content, topic, skill) => {
  const lines = content.split('\n').filter(line => line.trim());
  const concepts = [];
  let taskDescription = '';
  let keywords = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^[0-9]+\./)) {
      const title = line.replace(/^[0-9]+\./, '').trim();
      const body = lines[i+1] || 'Learn more about this concept.';
      concepts.push({ title, body });
    }
    if (line.toLowerCase().includes('practice') || line.toLowerCase().includes('task')) {
      taskDescription = lines[i+1] || 'Practice what you learned.';
    }
    if (line.toLowerCase().includes('keyword') || line.toLowerCase().includes('tip')) {
      keywords = line.split(':')[1]?.split(',').map(k => k.trim()) || [];
    }
  }

  return {
    id: `lesson_${Date.now()}`,
    title: `${topic} Explained`,
    skill: skill,
    level: 'beginner',
    duration: '5 min',
    concepts: concepts.length > 0 ? concepts : [
      { title: 'What is this?', body: `A beginner-friendly introduction to ${topic}.` },
      { title: 'How to use it', body: `Learn the basics of ${topic} step by step.` },
      { title: 'Practice makes perfect', body: `Try using ${topic} in a real scenario.` }
    ],
    task: {
      description: taskDescription || `Practice using ${topic} with a simple exercise.`,
      keywords: keywords.length > 0 ? keywords : [topic.toLowerCase(), 'practice'],
    },
    source: 'AI (parsed)',
  };
};

// AI Grading Service
export const gradeTask = async (userAnswer, keywords, taskDescription) => {
  // If no API key, use fallback
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.log('No API key found. Using fallback grading.');
    return getFallbackGrade(userAnswer, keywords);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a kind, encouraging tutor grading a practice task.
            Task: ${taskDescription}
            Keywords to look for: ${keywords.join(', ')}
            Grade the answer out of 10.
            Respond with JSON only: {"score": number, "feedback": string, "missing": array}`,
          },
          {
            role: 'user',
            content: `Here's my answer: "${userAnswer}"`
          }
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    
    return {
      score: result.score || 7,
      feedback: result.feedback || "Good effort! Keep practicing. 💪",
      missing: result.missing || [],
      source: 'AI',
    };
  } catch (error) {
    console.error('AI grading failed:', error);
    return getFallbackGrade(userAnswer, keywords);
  }
};

// Fallback lesson (works without API key)
const getFallbackLesson = (topic) => {
  const fallbacks = {
    vlookup: {
      id: 'lesson_001',
      title: 'VLOOKUP Explained in 5 Minutes',
      skill: 'Excel',
      level: 'beginner',
      duration: '5 min',
      concepts: [
        { title: 'What is VLOOKUP?', body: 'VLOOKUP searches for a value in the first column and returns a value from the same row.' },
        { title: 'The 4 Arguments', body: 'VLOOKUP needs: lookup_value, table_array, col_index_num, range_lookup.' },
        { title: 'Common Error: #N/A', body: '#N/A means the value was not found. Check for spaces or data type mismatches.' },
      ],
      task: {
        description: 'Find the sales amount for Product ID "P-1005" using VLOOKUP.',
        keywords: ['VLOOKUP', 'P-1005', 'sales'],
      },
      source: 'Fallback',
    },
    pivot: {
      id: 'lesson_002',
      title: 'Pivot Tables in 4 Minutes',
      skill: 'Excel',
      level: 'beginner',
      duration: '4 min',
      concepts: [
        { title: 'What is a Pivot Table?', body: 'A tool that summarizes and analyzes large datasets.' },
        { title: 'Rows vs Values', body: 'Drag fields to Rows to group data. Drag fields to Values to calculate.' },
        { title: 'Refreshing Data', body: 'Right-click the Pivot Table and select "Refresh" to update.' },
      ],
      task: {
        description: 'Create a Pivot Table showing total sales by Region.',
        keywords: ['Pivot Table', 'region', 'sales'],
      },
      source: 'Fallback',
    },
    data_cleaning: {
      id: 'lesson_003',
      title: 'Data Cleaning in 5 Minutes',
      skill: 'Excel',
      level: 'beginner',
      duration: '5 min',
      concepts: [
        { title: 'Remove Duplicates', body: 'Select your data → Data tab → Remove Duplicates.' },
        { title: 'TRIM Function', body: 'TRIM removes extra spaces from text. Use =TRIM(A2).' },
        { title: 'Find and Replace', body: 'Ctrl+H opens Find and Replace to fix consistent errors.' },
      ],
      task: {
        description: 'Clean the customer data: remove duplicates and trim extra spaces.',
        keywords: ['Remove Duplicates', 'TRIM', 'clean'],
      },
      source: 'Fallback',
    },
  };
  
  // Find matching fallback
  const key = Object.keys(fallbacks).find(k => topic.toLowerCase().includes(k));
  return fallbacks[key] || {
    ...fallbacks.vlookup,
    title: `${topic} Explained`,
    source: 'Fallback',
  };
};

// Fallback grading (works without API key)
const getFallbackGrade = (userAnswer, keywords) => {
  const found = keywords.filter(kw => 
    userAnswer.toLowerCase().includes(kw.toLowerCase())
  );
  const score = Math.min(10, Math.round((found.length / keywords.length) * 10) + 2);
  
  return {
    score: Math.min(score, 10),
    feedback: score >= 7 
      ? "Great work! You understood the key concepts. 💪" 
      : "Good start! Try using the specific functions mentioned in the lesson.",
    missing: score < 7 ? keywords.map(k => `Try using "${k}"`) : [],
    source: 'Fallback',
  };
};

export default {
  generateLesson,
  gradeTask,
};