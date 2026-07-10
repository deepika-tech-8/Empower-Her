// mobile/src/screens/LessonScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { generateLesson, gradeTask } from '../services/aiService';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

const LessonScreen = ({ route }) => {
  const { topic = 'vlookup', skill = 'Excel' } = route?.params || {};
  const { updateProgress } = useProgress();
  
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [gradeResult, setGradeResult] = useState(null);
  const [showPractice, setShowPractice] = useState(false);

  // Load lesson when component mounts or topic changes
  useEffect(() => {
    loadLesson();
  }, [topic]);

  // Generate or fetch lesson
  const loadLesson = async () => {
    setLoading(true);
    try {
      const lessonData = await generateLesson(topic, skill);
      setLesson(lessonData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load lesson. Please try again.');
      console.error('Lesson load error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle practice submission
  const handleSubmitPractice = async () => {
    if (!practiceAnswer.trim()) {
      Alert.alert('Oops!', 'Please type your answer first.');
      return;
    }

    setLoading(true);
    try {
      const result = await gradeTask(
        practiceAnswer,
        lesson?.task?.keywords || [],
        lesson?.task?.description || 'Practice using what you learned.'
      );
      setGradeResult(result);
      
      // Update progress
      updateProgress({ 
        lessonsCompleted: (prev) => (prev || 0) + 1,
        overallScore: Math.min(100, (prev?.overallScore || 0) + 2)
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to grade. Please try again.');
      console.error('Grading error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading && !lesson) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Generating your lesson... 🤖</Text>
        <Text style={styles.loadingSubtext}>This may take a moment</Text>
      </View>
    );
  }

  // Error state
  if (!lesson) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>😅 Lesson not found</Text>
        <Text style={styles.loadingSubtext}>Please try a different topic</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadLesson}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.topicTitle}>{lesson.title}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱️ {lesson.duration || '5 min'}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              {lesson.skill || 'Excel'}
            </Text>
          </View>
          {lesson.source && (
            <View style={[styles.badge, { backgroundColor: colors.secondaryLight }]}>
              <Text style={[styles.badgeText, { color: colors.secondary }]}>
                🤖 {lesson.source}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Concepts */}
      {lesson.concepts && lesson.concepts.map((concept, index) => (
        <View key={index} style={styles.conceptCard}>
          <Text style={styles.conceptTitle}>{index + 1}. {concept.title}</Text>
          <Text style={styles.conceptBody}>{concept.body}</Text>
        </View>
      ))}

      {/* Practice Section */}
      <View style={styles.practiceContainer}>
        <TouchableOpacity 
          style={styles.practiceToggle} 
          onPress={() => setShowPractice(!showPractice)}
        >
          <Text style={styles.practiceToggleText}>
            {showPractice ? '📝 Hide Practice Task' : '📝 Show Practice Task'}
          </Text>
        </TouchableOpacity>

        {showPractice && (
          <View style={styles.practiceContent}>
            <Text style={styles.taskTitle}>Practice Task:</Text>
            <Text style={styles.taskDescription}>
              {lesson.task?.description || 'Practice what you learned.'}
            </Text>
            
            <TextInput
              style={styles.answerInput}
              multiline
              placeholder="Type your answer here..."
              placeholderTextColor={colors.textLight}
              value={practiceAnswer}
              onChangeText={setPracticeAnswer}
              editable={!loading}
            />

            <TouchableOpacity 
              style={[styles.submitButton, loading && styles.disabledButton]} 
              onPress={handleSubmitPractice}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? '⏳ Grading...' : '🤖 Get Feedback'}
              </Text>
            </TouchableOpacity>

            {gradeResult && (
              <View style={styles.gradeContainer}>
                <View style={styles.gradeHeader}>
                  <Text style={styles.gradeScore}>Score: {gradeResult.score}/10</Text>
                  {gradeResult.source && (
                    <Text style={styles.gradeSource}>🤖 {gradeResult.source}</Text>
                  )}
                </View>
                <Text style={styles.gradeFeedback}>{gradeResult.feedback}</Text>
                {gradeResult.missing?.length > 0 && (
                  <View style={styles.missingContainer}>
                    <Text style={styles.missingTitle}>🔍 What to fix:</Text>
                    {gradeResult.missing.map((item, i) => (
                      <Text key={i} style={styles.missingItem}>• {item}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => {
          setPracticeAnswer('');
          setGradeResult(null);
          setShowPractice(false);
          loadLesson();
        }}
      >
        <Text style={styles.nextButtonText}>Next Lesson →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: spacing.xl,
    backgroundColor: colors.background 
  },
  loadingText: { 
    fontSize: typography.h2, 
    color: colors.textPrimary, 
    marginTop: spacing.md,
    fontWeight: 'bold' 
  },
  loadingSubtext: { 
    fontSize: typography.body, 
    color: colors.textSecondary,
    marginTop: spacing.xs 
  },
  errorText: { 
    fontSize: typography.h1, 
    color: colors.danger,
    fontWeight: 'bold' 
  },
  retryButton: { 
    marginTop: spacing.lg, 
    padding: spacing.md, 
    backgroundColor: colors.primary, 
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.xl 
  },
  retryButtonText: { 
    color: colors.white, 
    fontSize: typography.button, 
    fontWeight: 'bold' 
  },

  header: { 
    padding: spacing.lg, 
    backgroundColor: colors.card, 
    ...shadows.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.border 
  },
  topicTitle: { 
    fontSize: typography.h1, 
    fontWeight: 'bold', 
    color: colors.primary,
    marginBottom: spacing.sm 
  },
  badgeRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    gap: spacing.xs 
  },
  badge: { 
    backgroundColor: colors.border, 
    paddingHorizontal: spacing.sm, 
    paddingVertical: spacing.xs, 
    borderRadius: borderRadius.small,
    marginRight: spacing.xs,
    marginBottom: spacing.xs 
  },
  badgeText: { 
    fontSize: typography.tiny, 
    color: colors.textSecondary,
    fontWeight: '500' 
  },

  conceptCard: { 
    margin: spacing.md, 
    padding: spacing.md, 
    backgroundColor: colors.card, 
    borderRadius: borderRadius.medium, 
    borderLeftWidth: 4, 
    borderLeftColor: colors.primary, 
    ...shadows.small 
  },
  conceptTitle: { 
    fontSize: typography.h3, 
    fontWeight: 'bold', 
    color: colors.textPrimary,
    marginBottom: spacing.xs 
  },
  conceptBody: { 
    fontSize: typography.body, 
    color: colors.textSecondary, 
    lineHeight: 24 
  },

  practiceContainer: { 
    margin: spacing.md 
  },
  practiceToggle: { 
    padding: spacing.md, 
    backgroundColor: colors.secondary, 
    borderRadius: borderRadius.medium, 
    alignItems: 'center' 
  },
  practiceToggleText: { 
    color: colors.white, 
    fontSize: typography.button, 
    fontWeight: 'bold' 
  },
  practiceContent: { 
    marginTop: spacing.md 
  },
  taskTitle: { 
    fontSize: typography.h2, 
    fontWeight: 'bold', 
    color: colors.textPrimary,
    marginBottom: spacing.sm 
  },
  taskDescription: { 
    fontSize: typography.body, 
    color: colors.textSecondary, 
    marginBottom: spacing.md,
    lineHeight: 24 
  },
  answerInput: { 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: borderRadius.medium, 
    padding: spacing.md, 
    minHeight: 120, 
    textAlignVertical: 'top', 
    backgroundColor: colors.white,
    fontSize: typography.body,
    color: colors.textPrimary 
  },
  submitButton: { 
    marginTop: spacing.md, 
    padding: spacing.md, 
    backgroundColor: colors.success, 
    borderRadius: borderRadius.medium, 
    alignItems: 'center' 
  },
  disabledButton: { 
    backgroundColor: colors.textLight 
  },
  submitButtonText: { 
    color: colors.white, 
    fontSize: typography.button, 
    fontWeight: 'bold' 
  },

  gradeContainer: { 
    marginTop: spacing.md, 
    padding: spacing.md, 
    backgroundColor: colors.card, 
    borderRadius: borderRadius.medium, 
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.successLight 
  },
  gradeHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: spacing.sm 
  },
  gradeScore: { 
    fontSize: typography.h2, 
    fontWeight: 'bold', 
    color: colors.primary 
  },
  gradeSource: { 
    fontSize: typography.small, 
    color: colors.textLight 
  },
  gradeFeedback: { 
    fontSize: typography.body, 
    color: colors.textSecondary, 
    lineHeight: 24,
    marginBottom: spacing.sm 
  },
  missingContainer: { 
    marginTop: spacing.sm, 
    backgroundColor: colors.warningLight, 
    padding: spacing.md, 
    borderRadius: borderRadius.medium 
  },
  missingTitle: { 
    fontSize: typography.body, 
    fontWeight: 'bold', 
    color: colors.warning,
    marginBottom: spacing.xs 
  },
  missingItem: { 
    fontSize: typography.body, 
    color: colors.textSecondary, 
    marginLeft: spacing.md,
    paddingVertical: 2 
  },

  nextButton: { 
    margin: spacing.lg, 
    padding: spacing.md, 
    backgroundColor: colors.primary, 
    borderRadius: borderRadius.medium, 
    alignItems: 'center' 
  },
  nextButtonText: { 
    color: colors.white, 
    fontSize: typography.button, 
    fontWeight: 'bold' 
  },
});

export default LessonScreen;