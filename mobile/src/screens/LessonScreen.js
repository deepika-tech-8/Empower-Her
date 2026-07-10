// mobile/src/screens/LessonScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { lessonService } from '../services/lessonService';
import { gradingService } from '../services/gradingService';
import { useProgress } from '../context/ProgressContext';
import { colors, typography, spacing } from '../styles/theme';

const LessonScreen = ({ route }) => {
  const { topic } = route.params;
  const { progress, updateProgress } = useProgress();
  
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [gradeResult, setGradeResult] = useState(null);
  const [showPractice, setShowPractice] = useState(false);

  useEffect(() => {
    loadLesson();
  }, []);

  const loadLesson = async () => {
    setLoading(true);
    try {
      // Fetch AI-generated lesson
      const lessonData = await lessonService.generateLesson(topic);
      setLesson(lessonData);
    } catch (error) {
      console.error('Failed to load lesson:', error);
      // Fallback to seed content
      const seedLesson = await lessonService.getSeedLesson(topic);
      setLesson(seedLesson);
    }
    setLoading(false);
  };

  const handleSubmitPractice = async () => {
    setLoading(true);
    try {
      const result = await gradingService.gradeTask(lesson.task, practiceAnswer);
      setGradeResult(result);
      // Update progress
      updateProgress({ 
        lessonId: lesson.id, 
        score: result.score 
      });
    } catch (error) {
      console.error('Grading failed:', error);
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <ScrollView style={styles.container}>
      {/* Lesson Content */}
      <View style={styles.lessonContainer}>
        <Text style={styles.topicTitle}>{lesson.title}</Text>
        {lesson.concepts.map((concept, index) => (
          <View key={index} style={styles.conceptCard}>
            <Text style={styles.conceptTitle}>{concept.title}</Text>
            <Text style={styles.conceptBody}>{concept.body}</Text>
          </View>
        ))}
      </View>

      {/* Practice Task */}
      <View style={styles.practiceContainer}>
        <TouchableOpacity 
          style={styles.practiceToggle}
          onPress={() => setShowPractice(!showPractice)}
        >
          <Text style={styles.practiceToggleText}>
            {showPractice ? 'Hide Practice Task' : 'Show Practice Task 📝'}
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

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitPractice}
            >
              <Text style={styles.submitButtonText}>Submit for Feedback</Text>
            </TouchableOpacity>

            {gradeResult && (
              <View style={styles.gradeContainer}>
                <Text style={styles.gradeScore}>Score: {gradeResult.score}/10</Text>
                <Text style={styles.gradeFeedback}>{gradeResult.feedback}</Text>
                {gradeResult.missing && (
                  <View style={styles.missingContainer}>
                    <Text style={styles.missingTitle}>🔍 What to fix:</Text>
                    {gradeResult.missing.map((item, i) => (
                      <Text key={i} style={styles.missingItem}>• {item}</Text>
                    ))}
                  </View>
                )}
                <TouchableOpacity style={styles.flagButton}>
                  <Text style={styles.flagButtonText}>🚩 Flag This Score</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Next Lesson Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next Lesson →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  lessonContainer: { padding: spacing.md },
  topicTitle: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.md },
  conceptCard: { 
    backgroundColor: colors.card, 
    borderRadius: 8, 
    padding: spacing.md, 
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary 
  },
  conceptTitle: { fontSize: typography.h3, fontWeight: 'bold', color: colors.textPrimary },
  conceptBody: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  practiceContainer: { margin: spacing.md },
  practiceToggle: { 
    padding: spacing.md, 
    backgroundColor: colors.secondary, 
    borderRadius: 8,
    alignItems: 'center' 
  },
  practiceToggleText: { color: colors.white, fontSize: typography.button },
  practiceContent: { marginTop: spacing.md },
  taskTitle: { fontSize: typography.h2, fontWeight: 'bold', color: colors.textPrimary },
  taskDescription: { fontSize: typography.body, color: colors.textSecondary, marginVertical: spacing.sm },
  answerInput: { 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 8, 
    padding: spacing.md,
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: colors.white 
  },
  submitButton: { 
    marginTop: spacing.md, 
    padding: spacing.md, 
    backgroundColor: colors.success, 
    borderRadius: 8,
    alignItems: 'center' 
  },
  submitButtonText: { color: colors.white, fontSize: typography.button, fontWeight: 'bold' },
  gradeContainer: { 
    marginTop: spacing.md, 
    padding: spacing.md, 
    backgroundColor: colors.card, 
    borderRadius: 8 
  },
  gradeScore: { fontSize: typography.h2, fontWeight: 'bold', color: colors.primary },
  gradeFeedback: { fontSize: typography.body, color: colors.textSecondary, marginVertical: spacing.sm },
  missingContainer: { marginTop: spacing.sm, backgroundColor: colors.warningLight, padding: spacing.md, borderRadius: 8 },
  missingTitle: { fontSize: typography.body, fontWeight: 'bold', color: colors.warning },
  missingItem: { fontSize: typography.body, color: colors.textSecondary, marginLeft: spacing.md },
  flagButton: { 
    marginTop: spacing.sm, 
    padding: spacing.sm, 
    backgroundColor: colors.dangerLight, 
    borderRadius: 8,
    alignItems: 'center' 
  },
  flagButtonText: { color: colors.danger, fontSize: typography.body },
  nextButton: { 
    margin: spacing.lg, 
    padding: spacing.md, 
    backgroundColor: colors.primary, 
    borderRadius: 8,
    alignItems: 'center' 
  },
  nextButtonText: { color: colors.white, fontSize: typography.button, fontWeight: 'bold' },
});

export default LessonScreen;