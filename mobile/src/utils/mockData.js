// Realistic seed data for the cold-start phase of the platform
export const mockDataLessons = {
  excel_vlookup: {
    id: 'excel_vlookup',
    topic: 'Excel',
    title: 'Cleaning with VLOOKUP 🔍',
    cards: [
      {
        id: 1,
        concept: 'The "Why"',
        text: 'VLOOKUP is your helper assistant. It takes a known item (like an Order ID) and goes searching down a massive list to bring you back matching info (like customer names).',
      },
      {
        id: 2,
        concept: 'The Formula Map',
        text: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\n\n- lookup_value: The value you already know.\n- table_array: The range where your target data lives.\n- col_index_num: The column position containing your answer.',
      },
    ],
    practice: {
      instruction: 'Complete the formula below to pull matching data from the table starting in column A, returning values from Column 3:',
      baseText: '=VLOOKUP("ID-402", A:F, [Enter Col Number], FALSE)',
    },
  },
  excel_pivot_tables: {
    id: 'excel_pivot_tables',
    topic: 'Excel',
    title: 'Pivot Table Summaries 📊',
    cards: [
      {
        id: 1,
        concept: 'Why use Pivot Tables?',
        text: 'When a sheet has 10,000 sales rows, humans cannot read it. Pivot Tables instantly group them by category (e.g., total sales per city) in three clicks.',
      },
      {
        id: 2,
        concept: 'The Quadrants',
        text: 'You drag fields into 4 areas:\n1. Filters: Narrow down entire report.\n2. Columns: Side-by-side comparison fields.\n3. Rows: Down-the-page list items.\n4. Values: The math (Sum, Average, Count).'
      }
    ],
    practice: {
      instruction: 'If you want to view total revenue generated per country, which quadrant must you place the "Revenue" field in?',
      baseText: 'Quadrant (Filters, Columns, Rows, or Values):'
    }
  }
};

export const mockDoubts = [
  {
    id: 'doubt_1',
    userNickname: 'Learner #418',
    question: 'Why do I keep getting #N/A errors on my VLOOKUP formulas? The ID looks exactly the same!',
    upvotes: 124,
    tier: 'AI',
    answer: 'This is super common! Most often, this is because one ID has an invisible extra space at the end (e.g., "ID-101 " vs "ID-101"). Try wrapping your lookup value in TRIM(), like: =VLOOKUP(TRIM(A2), B:D, 2, FALSE).',
    timestamp: '2026-07-09T14:30:00.000Z'
  },
  {
    id: 'doubt_2',
    userNickname: 'Learner #102',
    question: 'Is it better to learn Python or Excel first for a junior data entry coordinator role?',
    upvotes: 82,
    tier: 'Mentor',
    answer: 'Verified Mentor (Sarah G., Senior Data Analyst): Excel is definitely the best starting point. 90% of entry-level coordinator roles use Excel daily. Python is wonderful for later on when you want to automate those workflows!',
    timestamp: '2026-07-10T08:15:00.000Z'
  }
];

export const mockRecaps = {
  vlookup_basics: {
    bullets: [
      "You learned that VLOOKUP searches left-to-right to connect fragmented data.",
      "You mastered matching unique identifiers across separate table lists.",
      "You solved the column index assignment task successfully."
    ],
    refresherQuestion: "What parameter in =VLOOKUP(A1, B:D, 3, FALSE) tells it to search for an EXACT match instead of an approximate one?",
    correctAnswer: "FALSE"
  }
};