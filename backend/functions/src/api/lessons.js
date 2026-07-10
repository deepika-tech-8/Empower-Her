import { SYSTEM_PROMPTS } from '../ai/prompts';
import { mockDataLessons } from '../../../../mobile/src/utils/mockData'; // Fallback path

/**
 * Cloud Function entry mock representing the modular concept delivery.
 * Utilizes structural fallback in low-connectivity/offline mode.
 */
export async function generateLessonEndpoint(req, res) {
  const { topic, isOffline } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Missing required query parameter: topic" });
  }

  // Graceful Offline Fallback to avoid service failures in low-connectivity areas
  if (isOffline) {
    const offlineCache = mockDataLessons[topic] || mockDataLessons['excel_vlookup'];
    return res.status(200).json({
      source: "local_offline_cache",
      data: offlineCache
    });
  }

  try {
    // In production, instantiate OpenAI / Claude API call here
    // const gptResponse = await callAIEngine(SYSTEM_PROMPTS.LESSON_GENERATION, topic);
    
    // Simulate API delivery
    const simulatedResponse = {
      title: `${topic} Optimization 🌸`,
      topic: topic,
      cards: [
        { id: 1, concept: "Basic syntax pattern", text: `Let us examine basic patterns in ${topic} to ease our development steps.` }
      ],
      practice: {
        instruction: "Match output requirements",
        baseText: "..."
      }
    };

    return res.status(200).json({
      source: "synthesized_ai_engine",
      data: simulatedResponse
    });
  } catch (error) {
    // Elegant system safety degradation
    return res.status(200).json({
      source: "degraded_fallback_store",
      data: mockDataLessons['excel_vlookup']
    });
  }
}