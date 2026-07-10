/**
 * Strict Document Layout Specifications (Schemas for Firestore collection objects)
 */

exports.UserDocument = {
  uid: "STRING",
  email: "STRING",
  displayName: "STRING",
  registeredAt: "ISO_DATETIME",
  momentumScore: "NUMBER (0-100)",
  isPaused: "BOOLEAN",
  helperPoints: "NUMBER",
  completedLessons: "ARRAY [STRING]"
};

exports.DoubtDocument = {
  id: "STRING",
  userNickname: "STRING",
  question: "STRING",
  answer: "STRING | NULL",
  upvotes: "NUMBER",
  tier: "STRING (AI | PEER | MENTOR)",
  timestamp: "ISO_DATETIME"
};

exports.LessonDocument = {
  id: "STRING",
  topic: "STRING (Excel | Python)",
  title: "STRING",
  cards: [
    { id: "NUMBER", concept: "STRING", text: "STRING" }
  ],
  practice: {
    instruction: "STRING",
    baseText: "STRING"
  }
};