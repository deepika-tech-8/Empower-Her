// mobile/src/screens/DashboardScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

const DashboardScreen = ({ navigation }) => {
  const { progress } = useProgress();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Priya! 👋</Text>
        <Text style={styles.subtitle}>Let's continue your journey</Text>
      </View>

      {/* Momentum Score */}
      <View style={styles.momentumCard}>
        <Text style={styles.momentumLabel}>🔥 Momentum Score</Text>
        <Text style={styles.momentumValue}>{progress.momentumScore}%</Text>
        <View style={styles.momentumBar}>
          <View style={[styles.momentumFill, { width: `${progress.momentumScore}%` }]} />
        </View>
        <Text style={styles.momentumSubtext}>Keep going! You're on track.</Text>
      </View>

      {/* Overall Readiness */}
      <TouchableOpacity
        style={styles.readinessCard}
        onPress={() => navigation.navigate('ReadinessScore')}
      >
        <Text style={styles.readinessLabel}>📊 Job-Readiness Score</Text>
        <Text style={styles.readinessValue}>{progress.overallScore}%</Text>
        <Text style={styles.readinessSubtext}>Tap to see breakdown →</Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primaryLight }]}
            onPress={() => navigation.navigate('Lesson', { topic: 'vlookup' })}
          >
            <Text style={styles.actionEmoji}>📖</Text>
            <Text style={styles.actionLabel}>Snack Lesson</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.secondaryLight }]}
            onPress={() => navigation.navigate('DoubtWall')}
          >
            <Text style={styles.actionEmoji}>💬</Text>
            <Text style={styles.actionLabel}>Doubt Wall</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.successLight }]}
            onPress={() => navigation.navigate('ReadinessScore')}
          >
            <Text style={styles.actionEmoji}>🎯</Text>
            <Text style={styles.actionLabel}>My Score</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Next Steps */}
      <View style={styles.nextSteps}>
        <Text style={styles.sectionTitle}>🔍 What to Fix Next</Text>
        {progress.nextSteps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <Text style={styles.stepBullet}>•</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      {/* Life Happens Pause */}
      <TouchableOpacity
        style={styles.pauseButton}
        onPress={() => navigation.navigate('PauseResume')}
      >
        <Text style={styles.pauseButtonText}>⏸️ Life Happens? Pause Learning</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, backgroundColor: colors.card, ...shadows.small },
  greeting: { fontSize: typography.h1, fontWeight: 'bold', color: colors.textPrimary },
  subtitle: { fontSize: typography.body, color: colors.textSecondary },
  momentumCard: { margin: spacing.lg, padding: spacing.lg, backgroundColor: colors.card, borderRadius: borderRadius.large, ...shadows.medium },
  momentumLabel: { fontSize: typography.small, color: colors.textSecondary },
  momentumValue: { fontSize: 36, fontWeight: 'bold', color: colors.primary, marginVertical: spacing.xs },
  momentumBar: { width: '100%', height: 8, backgroundColor: colors.border, borderRadius: borderRadius.small },
  momentumFill: { height: '100%', backgroundColor: colors.primary, borderRadius: borderRadius.small },
  momentumSubtext: { fontSize: typography.small, color: colors.textSecondary, marginTop: spacing.xs },
  readinessCard: { marginHorizontal: spacing.lg, padding: spacing.lg, backgroundColor: colors.secondaryLight, borderRadius: borderRadius.large },
  readinessLabel: { fontSize: typography.small, color: colors.textSecondary },
  readinessValue: { fontSize: 32, fontWeight: 'bold', color: colors.secondary, marginVertical: spacing.xs },
  readinessSubtext: { fontSize: typography.small, color: colors.primary },
  quickActions: { padding: spacing.lg },
  sectionTitle: { fontSize: typography.h2, fontWeight: 'bold', marginBottom: spacing.md },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { flex: 1, marginHorizontal: spacing.xs, padding: spacing.md, borderRadius: borderRadius.medium, alignItems: 'center' },
  actionEmoji: { fontSize: 24 },
  actionLabel: { fontSize: typography.small, color: colors.textPrimary, marginTop: spacing.xs },
  nextSteps: { padding: spacing.lg, backgroundColor: colors.card, marginHorizontal: spacing.lg, borderRadius: borderRadius.large, ...shadows.small },
  stepItem: { flexDirection: 'row', marginVertical: spacing.xs },
  stepBullet: { fontSize: typography.body, color: colors.primary, marginRight: spacing.sm },
  stepText: { fontSize: typography.body, color: colors.textSecondary, flex: 1 },
  pauseButton: { margin: spacing.lg, padding: spacing.md, backgroundColor: colors.warningLight, borderRadius: borderRadius.medium, alignItems: 'center', borderWidth: 1, borderColor: colors.warning },
  pauseButtonText: { fontSize: typography.button, color: colors.warning, fontWeight: 'bold' },
});

export default DashboardScreen;