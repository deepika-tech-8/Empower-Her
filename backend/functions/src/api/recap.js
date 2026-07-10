const { mockRecaps } = require('../../../../mobile/src/utils/mockData'); // Path alignment

/**
 * Assembles micro-summaries to safely onboard learners returning from pause periods.
 */
exports.generateRecap = async (req, res) => {
  const { lastLessonId } = req.body;

  if (!lastLessonId) {
    return res.status(400).json({ error: "Missing lastLessonId parameter." });
  }

  try {
    // Select correct matching recap object index
    const recap = mockRecaps[lastLessonId] || mockRecaps.vlookup_basics;
    return res.status(200).json({
      status: "success",
      recap
    });
  } catch (error) {
    return res.status(500).json({ error: "Recap compiling failed: " + error.message });
  }
};