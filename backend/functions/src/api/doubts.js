const { db } = require('../database/firestore');
const { SYSTEM_PROMPTS } = require('../ai/prompts');

/**
 * Handles incoming doubts and intelligently tiers their routing.
 */
exports.resolveDoubt = async (req, res) => {
  const { doubtId, question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Required field: question missing." });
  }

  try {
    // Tier 1: Auto AI resolution mapping
    let generatedAnswer = "This has been queued for our peer feedback community.";
    
    // Simulate API pipeline structure
    if (question.toLowerCase().includes("vlookup") || question.toLowerCase().includes("error")) {
      generatedAnswer = "💡 It seems you are seeing mismatched identifier issues! Use standard TRIM() to strip hidden padding spaces.";
    }

    const docPayload = {
      userNickname: `Learner #${Math.floor(Math.random() * 900) + 100}`,
      question,
      upvotes: 1,
      tier: 'AI',
      answer: generatedAnswer,
      timestamp: new Date().toISOString()
    };

    if (doubtId) {
      await db.collection('doubts').doc(doubtId).set(docPayload, { merge: true });
    } else {
      await db.collection('doubts').add(docPayload);
    }

    return res.status(200).json({ status: "success", resolvedTier: "AI", answer: generatedAnswer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};