// mobile/src/screens/LessonScreen.js (with AI Integration)
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
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
  const [useAI, setUseAI] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [topic]);

  const loadLesson = async () => {
    setLoading(true);
    try {
      if (useAI) {
        const aiLesson = await generateLesson(topic, skill);
        setLesson(aiLesson);
      } else {
        // Fallback to seed data
        const { seedLessons } = await import('../utils/mockData');
        setLesson(seedLessons[topic] || seedLessons.vlookup);
      }
    } catch (error) {
      // Fallback to seed
      const { seedLessons } = await import('../utils/mockData');
      setLesson(seedLessons[topic] || seedLessons.vlookup);
    }
    setLoading(false);
  };

  const handleSubmitPractice = async () => {
    if (!practiceAnswer.trim()) {
      Alert.alert('Oops!', 'Please type your answer first.');
      return;
    }

    setLoading(true);
    try {
      const result = await gradeTask(
        practiceAnswer,
        lesson.task.keywords || [],
        lesson.task.description
      );
      setGradeResult(result);
      updateProgress({ 
        lessonsCompleted: (prev) => (prev || 0) + 1 
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to grade. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !lesson) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>AI is creating your lesson... 🤖</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.topicTitle}>{lesson.title}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱️ {lesson.duration || '5 min'}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{lesson.skill}</Text>
          </View>
          {useAI && (
            <View style={[styles.badge, { backgroundColor: colors.secondaryLight }]}>
              <Text style={[styles.badgeText, { color: colors.secondary }]}>🤖 AI Generated</Text>
            </View>
          )}
        </View>
      </View>

      {lesson.concepts?.map((concept, index) => (
        <View key={index} style={styles.conceptCard}>
          <Text style={styles.conceptTitle}>{index + 1}. {concept.title}</Text>
          <Text style={styles.conceptBody}>{concept.body}</Text>
        </View>
      ))}

      <View style={styles.practiceContainer}>
        <TouchableOpacity style={styles.practiceToggle} onPress={() => setShowPractice(!showPractice)}>
          <Text style={styles.practiceToggleText}>
            {showPractice ? '📝 Hide Practice Task' : '📝 Show Practice Task'}
          </Text>
        </TouchableOpacity>

        {showPractice && (
          <View style={styles.practiceContent}>
            <Text style={styles.taskTitle}>Practice Task:</Text>
            <Text style={styles.taskDescription}>{lesson.task.description}</Text>
            
            <TextInput
              style={styles.answerInput}
              multiline
              placeholder="Type your answer here..."
              value={practiceAnswer}
              onChangeText={setPracticeAnswer}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPractice}>
              <Text style={styles.submitButtonText}>🤖 Get AI Feedback</Text>
            </TouchableOpacity>

            {gradeResult && (
              <View style={styles.gradeContainer}>
                <Text style={styles.gradeScore}>Score: {gradeResult.score}/10</Text>
                <Text style={styles.gradeFeedback}>{gradeResult.feedback}</Text>
                {gradeResult.missing?.length > 0 && (
                  <View style={styles.missingContainer}>
                    <Text style={styles.missingTitle}>🔍 What to fix:</Text>
                    {gradeResult.missing.map((item, i) => (
                      <Text key={i} style={styles.missingItem}>• {item}</Text>
                    ))}
                  </View>
                )}
                <Text style={styles.aiTag}>🤖 AI Graded</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next Lesson →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  loadingText: { fontSize: typography.body, color: colors.textSecondary, textAlign: 'center' },
  header: { padding: spacing.lg, backgroundColor: colors.card, ...shadows.small },
  topicTitle: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary },
  badgeRow: { flexDirection: 'row', marginTop: spacing.sm, flexWrap: 'wrap', gap: spacing.xs },
  badge: { backgroundColor: colors.border, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.small, marginRight: spacing.xs },
  badgeText: { fontSize: typography.tiny, color: colors.textSecondary },
  conceptCard: { margin: spacing.md, padding: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.medium, borderLeftWidth: 4, borderLeftColor: colors.primary, ...shadows.small },
  conceptTitle: { fontSize: typography.h3, fontWeight: 'bold', color: colors.textPrimary },
  conceptBody: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  practiceContainer: { margin: spacing.md },
  practiceToggle: { padding: spacing.md, backgroundColor: colors.secondary, borderRadius: borderRadius.medium, alignItems: 'center' },
  practiceToggleText: { color: colors.white, fontSize: typography.button, fontWeight: 'bold' },
  practiceContent: { marginTop: spacing.md },
  taskTitle: { fontSize: typography.h2, fontWeight: 'bold', color: colors.textPrimary },
  taskDescription: { fontSize: typography.body, color: colors.textSecondary, marginVertical: spacing.sm },
  answerInput: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.medium, padding: spacing.md, minHeight: 120, textAlignVertical: 'top', backgroundColor: colors.white },
  submitButton: { marginTop: spacing.md, padding: spacing.md, backgroundColor: colors.success, borderRadius: borderRadius.medium, alignItems: 'center' },
  submitButtonText: { color: colors.white, fontSize: typography.button, fontWeight: 'bold' },
  gradeContainer: { marginTop: spacing.md, padding: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.medium, ...shadows.small },
  gradeScore: { fontSize: typography.h2, fontWeight: 'bold', color: colors.primary },
  gradeFeedback: { fontSize: typography.body, color: colors.textSecondary, marginVertical: spacing.sm },
  missingContainer: { marginTop: spacing.sm, backgroundColor: colors.warningLight, padding: spacing.md, borderRadius: borderRadius.medium },
  missingTitle: { fontSize: typography.body, fontWeight: 'bold', color: colors.warning },
  missingItem: { fontSize: typography.body, color: colors.textSecondary, marginLeft: spacing.md },
  aiTag: { fontSize: typography.tiny, color: colors.textLight, textAlign: 'right', marginTop: spacing.xs },
  nextButton: { margin: spacing.lg, padding: spacing.md, backgroundColor: colors.primary, borderRadius: borderRadius.medium, alignItems: 'center' },
  nextButtonText: { color: colors.white, fontSize: typography.button, fontWeight: 'bold' },
});

export default LessonScreen;