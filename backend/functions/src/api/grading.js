const { SYSTEM_PROMPTS } = require('../ai/prompts');

/**
 * Validates practical user assignments relative to analytical standards.
 */
exports.gradePracticeTask = async (req, res) => {
  const { lessonId, userAnswer } = req.body;

  if (!lessonId || userAnswer === undefined) {
    return res.status(400).json({ error: "Parameters validation failed: lessonId & userAnswer required." });
  }

  try {
    // Process input data structure (Emulating OpenAI execution paths)
    const normalizedInput = userAnswer.trim().replace(/\s+/g, '');
    let passed = false;
    let score = "5/10";
    let response = "Let's work together to fix this structure. Review the step-card on offsetting column indexes.";

    if (lessonId === 'excel_vlookup' && normalizedInput === '3') {
      passed = true;
      score = "10/10";
      response = "Excellent job! You correctly directed the formula index to column 3. Excellent task execution!";
    }

    const gradingOutput = {
      passed,
      score,
      response
    };

    return res.status(200).json(gradingOutput);
  } catch (error) {
    return res.status(500).json({ error: "Grading system failure: " + error.message });
  }
};