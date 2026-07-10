import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { spacing, typography, glassmorphism } from '../styles/theme';
import { Button } from '../components/common/Button';

const MOCK_LESSON = {
  id: 'vlookup_basics',
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
};

export default function LessonScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const { completeLesson } = useProgress();
  const [currentCard, setCurrentCard] = useState(0);
  const [learnerAnswer, setLearnerAnswer] = useState('');
  const [isGraded, setIsGraded] = useState(false);
  const [gradingFeedback, setGradingFeedback] = useState(null);
  const [language, setLanguage] = useState('EN'); // Localization support

  const handleGradeTask = () => {
    if (!learnerAnswer.trim()) {
      Alert.alert('Almost there', 'Give it a try before grading!');
      return;
    }

    // AI grading approximation for structural mock logic
    const sanitized = learnerAnswer.replace(/\s+/g, '');
    if (sanitized === '3') {
      setGradingFeedback({
        passed: true,
        score: '10/10',
        response: 'Spot on! You pointed directly to Column 3 to extract the record. Excellent job adjusting the layout structure.',
      });
      completeLesson(MOCK_LESSON.id);
    } else {
      setGradingFeedback({
        passed: false,
        score: '6/10',
        response: 'Good attempt. Remember: we need to pull from the 3rd column. Check the parameter index again.',
      });
    }
    setIsGraded(true);
  };

  const currentConcept = MOCK_LESSON.cards[currentCard];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.topicLabel, { color: colors.primary }]}>{MOCK_LESSON.topic.toUpperCase()}</Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{MOCK_LESSON.title}</Text>
        
        {/* Simple translation pill */}
        <TouchableOpacity 
          style={[styles.translatePill, { backgroundColor: colors.accent }]}
          onPress={() => setLanguage(l => l === 'EN' ? 'HI' : 'EN')}
        >
          <Text style={[styles.translateText, { color: colors.textInverse }]}>
            {language === 'EN' ? 'Translate to Hindi' : 'Show English'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lesson concept step cards */}
      <View style={[styles.glassCard, glassmorphism(isDarkMode)]}>
        <Text style={[styles.conceptTitle, { color: colors.textPrimary }]}>
          Step {currentConcept.id}: {currentConcept.concept}
        </Text>
        <Text style={[styles.conceptText, { color: colors.textSecondary }]}>
          {language === 'EN' 
            ? currentConcept.text 
            : 'VLOOKUP आपकी सहायक मार्गदर्शिका है। यह एक ज्ञात आइटम (जैसे ऑर्डर आईडी) को एक विशाल डेटा सूची में खोजकर संबंधित रिकॉर्ड (जैसे ग्राहक का नाम) ढूंढ निकालती है।'}
        </Text>

        <View style={styles.cardNav}>
          <TouchableOpacity 
            disabled={currentCard === 0} 
            onPress={() => setCurrentCard(p => p - 1)}
          >
            <Text style={{ color: currentCard === 0 ? colors.textSecondary : colors.primary }}>Previous</Text>
          </TouchableOpacity>
          <Text style={{ color: colors.textSecondary }}>{currentCard + 1} of {MOCK_LESSON.cards.length}</Text>
          <TouchableOpacity 
            disabled={currentCard === MOCK_LESSON.cards.length - 1} 
            onPress={() => setCurrentCard(p => p + 1)}
          >
            <Text style={{ color: currentCard === MOCK_LESSON.cards.length - 1 ? colors.textSecondary : colors.primary }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Applied Task Practice Container */}
      <View style={[styles.practiceCard, glassmorphism(isDarkMode)]}>
        <Text style={[styles.practiceHeader, { color: colors.textPrimary }]}>Practice Task 🛠️</Text>
        <Text style={[styles.instruction, { color: colors.textSecondary }]}>
          {MOCK_LESSON.practice.instruction}
        </Text>
        
        <Text style={[styles.codeBase, { color: colors.textPrimary }]}>
          {MOCK_LESSON.practice.baseText}
        </Text>

        <TextInput
          style={[styles.input, { borderColor: colors.primary, color: colors.textPrimary }]}
          placeholder="Enter column number index (e.g. 3)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={learnerAnswer}
          onChangeText={setLearnerAnswer}
          editable={!isGraded}
        />

        {isGraded ? (
          <View style={[
            styles.feedbackContainer, 
            { backgroundColor: gradingFeedback.passed ? 'rgba(152, 251, 152, 0.2)' : 'rgba(255, 178, 178, 0.2)' }
          ]}>
            <Text style={[styles.feedbackScore, { color: colors.textPrimary }]}>
              Grade: {gradingFeedback.score}
            </Text>
            <Text style={[styles.feedbackBody, { color: colors.textSecondary }]}>
              {gradingFeedback.response}
            </Text>
            <Button 
              title={gradingFeedback.passed ? "Next Lesson" : "Try Again"} 
              onPress={() => {
                if (gradingFeedback.passed) {
                  navigation.navigate('Dashboard');
                } else {
                  setIsGraded(false);
                  setLearnerAnswer('');
                }
              }}
              style={styles.actionBtn}
            />
          </View>
        ) : (
          <Button title="Submit to AI Grading" onPress={handleGradeTask} style={styles.actionBtn} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    marginTop: 50,
    marginBottom: spacing.md,
  },
  topicLabel: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  title: {
    ...typography.h1,
    marginVertical: spacing.xs,
  },
  translatePill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  translateText: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  glassCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  conceptTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  conceptText: {
    ...typography.body,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  cardNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  practiceCard: {
    padding: spacing.md,
    marginBottom: 50,
  },
  practiceHeader: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  instruction: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  codeBase: {
    fontFamily: 'monospace',
    padding: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: spacing.sm,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  feedbackContainer: {
    padding: spacing.md,
    borderRadius: 15,
    marginVertical: spacing.xs,
  },
  feedbackScore: {
    ...typography.body,
    fontWeight: 'bold',
  },
  feedbackBody: {
    ...typography.caption,
    lineHeight: 18,
    marginVertical: spacing.xs,
  },
  actionBtn: {
    marginTop: spacing.xs,
  },
});