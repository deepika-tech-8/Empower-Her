// mobile/src/utils/mockData.js
// Seed content for cold-start demo and MVP testing

export const seedLessons = {
  vlookup: {
    id: 'lesson_001',
    title: 'VLOOKUP Explained in 5 Minutes',
    skill: 'Excel',
    level: 'beginner',
    duration: '5 min',
    concepts: [
      {
        title: 'What is VLOOKUP?',
        body: 'VLOOKUP stands for "Vertical Lookup". It searches for a value in the first column of a table and returns a value in the same row from another column. Think of it like finding a friend\'s phone number by searching their name in a contact list.',
      },
      {
        title: 'The 4 Arguments',
        body: 'VLOOKUP needs 4 things: (1) lookup_value - what you\'re searching for, (2) table_array - where to search, (3) col_index_num - which column to return, (4) range_lookup - TRUE for approximate match, FALSE for exact match.',
      },
      {
        title: 'Common Error: #N/A',
        body: '#N/A means "Not Available". This happens when the lookup value isn\'t found in the first column. Check for: extra spaces, different data types, or missing values.',
      },
    ],
    task: {
      description: 'You have a sales sheet with Product IDs and Sales Amounts. Use VLOOKUP to find the Sales Amount for Product ID "P-1005".',
      keywords: ['VLOOKUP', 'P-1005', 'sales', 'table'],
      rubric: [
        { criteria: 'Correctly identifies the lookup_value', points: 3 },
        { criteria: 'Correct table_array reference', points: 3 },
        { criteria: 'Returns correct sales amount', points: 4 },
      ],
    },
    sampleAnswer: '=VLOOKUP("P-1005", A2:B100, 2, FALSE)',
  },

  pivotTables: {
    id: 'lesson_002',
    title: 'Pivot Tables in 4 Minutes',
    skill: 'Excel',
    level: 'beginner',
    duration: '4 min',
    concepts: [
      {
        title: 'What is a Pivot Table?',
        body: 'A Pivot Table is a tool that summarizes and analyzes large datasets. It lets you rearrange rows, columns, and values to see patterns in your data.',
      },
      {
        title: 'Rows vs Values',
        body: 'Drag fields to Rows to group data (e.g., Product Category). Drag fields to Values to calculate (e.g., Sum of Sales). This creates a summary table in seconds.',
      },
      {
        title: 'Refreshing Data',
        body: 'If your source data changes, right-click the Pivot Table and select "Refresh" to update the summary. Important: Pivot Tables don\'t update automatically!',
      },
    ],
    task: {
      description: 'Create a Pivot Table that shows total sales by Region from the Sales Data sheet.',
      keywords: ['Pivot Table', 'region', 'sales', 'sum'],
      rubric: [
        { criteria: 'Correctly selects data range', points: 3 },
        { criteria: 'Adds Region to Rows', points: 3 },
        { criteria: 'Adds Sales to Values with Sum', points: 4 },
      ],
    },
    sampleAnswer: 'Select data → Insert → Pivot Table → Region to Rows → Sales to Values (Sum)',
  },

  dataCleaning: {
    id: 'lesson_003',
    title: 'Data Cleaning in 6 Minutes',
    skill: 'Excel',
    level: 'beginner',
    duration: '6 min',
    concepts: [
      {
        title: 'Remove Duplicates',
        body: 'Select your data → Data tab → Remove Duplicates. This removes duplicate rows based on selected columns. Always make a backup first!',
      },
      {
        title: 'TRIM Function',
        body: 'TRIM removes extra spaces from text. Use =TRIM(A2) to clean up messy text fields. This is especially useful for names, addresses, and product descriptions.',
      },
      {
        title: 'Find and Replace',
        body: 'Ctrl+H opens Find and Replace. Use it to fix consistent errors (e.g., replacing "N/A" with blank) or to standardize formatting.',
      },
    ],
    task: {
      description: 'Clean the customer data: remove duplicates, trim extra spaces, and fix formatting.',
      keywords: ['Remove Duplicates', 'TRIM', 'Find and Replace', 'clean'],
      rubric: [
        { criteria: 'Removes duplicate entries', points: 3 },
        { criteria: 'Uses TRIM to clean text', points: 3 },
        { criteria: 'Fixes formatting issues', points: 4 },
      ],
    },
    sampleAnswer: 'Data tab → Remove Duplicates → =TRIM(A2) → Ctrl+H to replace',
  },
};

export const seedDoubts = [
  {
    id: 'doubt_001',
    question: 'Why does my VLOOKUP return #N/A?',
    tier: 'AI',
    answer: 'This usually happens when: (1) The lookup value has extra spaces — try TRIM(), (2) The data type doesn\'t match — number vs text, (3) The value simply doesn\'t exist in the table. Try using FALSE for exact match to avoid approximate matches.',
    upvotes: 1204,
    askedBy: 'Learner #482',
    tags: ['VLOOKUP', 'error', 'beginner'],
    createdAt: '2026-07-01',
  },
  {
    id: 'doubt_002',
    question: 'How do I combine data from two sheets?',
    tier: 'Peer',
    answer: 'You can use XLOOKUP or INDEX-MATCH! If you\'re on an older Excel version, try: =VLOOKUP(A2, Sheet2!A:B, 2, FALSE). This looks up the value in A2 on Sheet2 and returns column B.',
    upvotes: 847,
    askedBy: 'Learner #103',
    tags: ['XLOOKUP', 'multiple sheets', 'INDEX-MATCH'],
    createdAt: '2026-07-02',
  },
  {
    id: 'doubt_003',
    question: 'What\'s the difference between COUNT and COUNTA?',
    tier: 'Mentor',
    answer: 'COUNT counts only cells with NUMBERS. COUNTA counts cells with ANY content (numbers, text, errors). Use COUNTA for non-empty cells in general. Verified by Mentor Sarah (8 years Excel experience).',
    upvotes: 523,
    askedBy: 'Learner #756',
    tags: ['COUNT', 'COUNTA', 'functions'],
    createdAt: '2026-07-03',
  },
  {
    id: 'doubt_004',
    question: 'My Pivot Table won\'t update with new data!',
    tier: 'AI',
    answer: 'Pivot Tables don\'t auto-refresh. Click anywhere in the Pivot Table → right-click → select "Refresh". If you\'re adding new rows, make sure your data range includes them (use a dynamic named range or convert to a Table).',
    upvotes: 982,
    askedBy: 'Learner #234',
    tags: ['Pivot Table', 'refresh', 'dynamic range'],
    createdAt: '2026-07-04',
  },
  {
    id: 'doubt_005',
    question: 'What\'s the shortcut for AutoSum?',
    tier: 'AI',
    answer: 'Alt + = (Windows) or Command + Shift + T (Mac). This automatically adds a SUM function for the selected range. Pro tip: Excel often guesses the right range correctly!',
    upvotes: 1567,
    askedBy: 'Learner #891',
    tags: ['AutoSum', 'shortcuts', 'Excel'],
    createdAt: '2026-07-05',
  },
];

export const mockProgress = {
  overallScore: 68,
  breakdown: {
    formulas: 85,
    pivotTables: 40,
    dataCleaning: 62,
    vlookup: 75,
  },
  nextSteps: [
    'Practice Pivot Tables — you\'re weakest here',
    'Review VLOOKUP with multiple criteria',
    'Try 2 more data cleaning challenges',
  ],
  jobsReadyFor: [
    'Data Entry Clerk',
    'Junior Data Analyst (with more practice)',
  ],
  lessonsCompleted: 4,
  momentumScore: 72,
  streakDays: 12,
  totalMinutesLearned: 156,
};

export const mockGoals = [
  { id: 'goal_001', title: 'Master VLOOKUP', completed: true },
  { id: 'goal_002', title: 'Learn Pivot Tables', completed: false },
  { id: 'goal_003', title: 'Clean 5 datasets', completed: false },
  { id: 'goal_004', title: 'Complete all Excel modules', completed: false },
];

export const mockTasks = [
  {
    id: 'task_001',
    title: 'VLOOKUP Practice',
    skill: 'Excel',
    difficulty: 'Easy',
    completed: true,
  },
  {
    id: 'task_002',
    title: 'Create Pivot Table',
    skill: 'Excel',
    difficulty: 'Medium',
    completed: false,
  },
  {
    id: 'task_003',
    title: 'Clean Messy Data',
    skill: 'Excel',
    difficulty: 'Medium',
    completed: false,
  },
];

export default {
  seedLessons,
  seedDoubts,
  mockProgress,
  mockGoals,
  mockTasks,
};