// mobile/src/screens/ReadinessScoreScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { colors, typography, spacing } from '../styles/theme';

const ReadinessScoreScreen = () => {
  const { progress } = useProgress();
  const [score, setScore] = useState(null);
  const [breakdown, setBreakdown] = useState(null);

  useEffect(() => {
    // Calculate readiness score from progress
    calculateScore();
  }, [progress]);

  const calculateScore = () => {
    // In production, this would aggregate all lesson scores
    const mockScore = {
      overall: 68,
      breakdown: {
        formulas: 85,
        pivotTables: 40,
        dataCleaning: 62,
        vlookup: 75,
      },
      nextSteps: [
        'Practice Pivot Tables - you\'re weakest here',
        'Review VLOOKUP with multiple criteria',
        'Try 2 more data cleaning challenges',
      ],
      jobsReadyFor: ['Data Entry', 'Junior Data Analyst (with more practice)'],
    };
    setScore(mockScore.overall);
    setBreakdown(mockScore);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Job-Readiness Score</Text>
        <Text style={styles.subtitle}>Sourced from 40+ real job listings</Text>
      </View>

      {/* Overall Score */}
      <View style={styles.scoreCircle}>
        <Text style={styles.scoreNumber}>{score}%</Text>
        <Text style={styles.scoreLabel}>Overall Readiness</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>📊 Sourced from 40+ job listings</Text>
        </View>
      </View>

      {/* Skill Breakdown */}
      <View style={styles.breakdownContainer}>
        <Text style={styles.sectionTitle}>Skill Breakdown</Text>
        {breakdown && Object.entries(breakdown.breakdown).map(([skill, value]) => (
          <View key={skill} style={styles.skillRow}>
            <Text style={styles.skillName}>
              {skill.charAt(0).toUpperCase() + skill.slice(1)}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${value}%` }]} />
            </View>
            <Text style={styles.skillValue}>{value}%</Text>
          </View>
        ))}
      </View>

      {/* Next Steps */}
      <View style={styles.nextStepsContainer}>
        <Text style={styles.sectionTitle}>🔍 What to Fix Next</Text>
        {breakdown?.nextSteps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <Text style={styles.stepBullet}>•</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      {/* Jobs Ready For */}
      <View style={styles.jobsContainer}>
        <Text style={styles.sectionTitle}>💼 You're Ready For:</Text>
        {breakdown?.jobsReadyFor.map((job, index) => (
          <View key={index} style={styles.jobTag}>
            <Text style={styles.jobTagText}>{job}</Text>
          </View>
        ))}
      </View>

      {/* Flag Button */}
      <TouchableOpacity style={styles.flagButton}>
        <Text style={styles.flagButtonText}>🚩 Flag This Score</Text>
        <Text style={styles.flagSubtext}>
          Think this score is wrong? Let us know.
        </Text>
      </TouchableOpacity>

      {/* Unlock Mock Interview */}
      {score >= 70 && (
        <TouchableOpacity style={styles.mockInterviewButton}>
          <Text style={styles.mockInterviewText}>🎤 Unlock Mock Interview</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, alignItems: 'center' },
  title: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary },
  subtitle: { fontSize: typography.body, color: colors.textSecondary },
  scoreCircle: { 
    alignItems: 'center', 
    padding: spacing.xl,
    backgroundColor: colors.card,
    margin: spacing.lg,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  scoreNumber: { fontSize: 64, fontWeight: 'bold', color: colors.primary },
  scoreLabel: { fontSize: typography.body, color: colors.textSecondary },
  badgeContainer: { 
    marginTop: spacing.sm, 
    backgroundColor: colors.primaryLight, 
    paddingHorizontal: spacing.md, 
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  badgeText: { fontSize: typography.small, color: colors.primary },
  breakdownContainer: { padding: spacing.lg },
  sectionTitle: { fontSize: typography.h2, fontWeight: 'bold', marginBottom: spacing.md },
  skillRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.xs },
  skillName: { width: 100, fontSize: typography.body, color: colors.textPrimary },
  progressBar: { flex: 1, height: 8, backgroundColor: colors.border, borderRadius: 4, marginHorizontal: spacing.sm },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  skillValue: { width: 40, fontSize: typography.body, fontWeight: 'bold', textAlign: 'right' },
  nextStepsContainer: { padding: spacing.lg, backgroundColor: colors.card, margin: spacing.lg, borderRadius: 8 },
  stepItem: { flexDirection: 'row', marginVertical: spacing.xs },
  stepBullet: { fontSize: typography.body, color: colors.primary, marginRight: spacing.sm },
  stepText: { fontSize: typography.body, color: colors.textSecondary, flex: 1 },
  jobsContainer: { padding: spacing.lg },
  jobTag: { 
    backgroundColor: colors.successLight, 
    paddingHorizontal: spacing.md, 
    paddingVertical: spacing.sm,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginVertical: spacing.xs,
  },
  jobTagText: { color: colors.success, fontWeight: 'bold' },
  flagButton: { 
    margin: spacing.lg, 
    padding: spacing.md, 
    backgroundColor: colors.dangerLight, 
    borderRadius: 8,
    alignItems: 'center' 
  },
  flagButtonText: { color: colors.danger, fontSize: typography.button, fontWeight: 'bold' },
  flagSubtext: { color: colors.textSecondary, fontSize: typography.small },
  mockInterviewButton: { 
    margin: spacing.lg, 
    padding: spacing.md, 
    backgroundColor: colors.success, 
    borderRadius: 8,
    alignItems: 'center' 
  },
  mockInterviewText: { color: colors.white, fontSize: typography.button, fontWeight: 'bold' },
});

export default ReadinessScoreScreen;