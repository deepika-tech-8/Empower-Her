// scripts/generateMockData.js
// Generate mock user data for testing

const fs = require('fs');
const path = require('path');

const users = [
  { id: 'user_001', name: 'Priya', email: 'priya@example.com', goal: 'Data Analyst' },
  { id: 'user_002', name: 'Ananya', email: 'ananya@example.com', goal: 'Data Entry' },
  { id: 'user_003', name: 'Meera', email: 'meera@example.com', goal: 'Business Analyst' },
];

const progress = [
  { userId: 'user_001', overallScore: 68, lessonsCompleted: 4 },
  { userId: 'user_002', overallScore: 45, lessonsCompleted: 2 },
  { userId: 'user_003', overallScore: 82, lessonsCompleted: 6 },
];

const output = {
  users,
  progress,
};

fs.writeFileSync(
  path.join(__dirname, '../mobile/src/utils/mockUsers.json'),
  JSON.stringify(output, null, 2)
);

console.log('✅ Mock data generated!');