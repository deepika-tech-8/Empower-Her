// mobile/src/screens/DashboardScreen.js - UNIQUE DESIGN
import React from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, 
  StyleSheet, Dimensions, Image 
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { colors, typography, spacing, borderRadius, shadows, gradients } from '../styles/theme';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const { progress } = useProgress();

  const quickActions = [
    { 
      id: 'lesson', 
      title: 'Snack Lesson', 
      emoji: '📖', 
      color: colors.primaryLight,
      iconColor: colors.primary,
      action: () => navigation.navigate('Lesson', { topic: 'vlookup' }),
    },
    { 
      id: 'doubt', 
      title: 'Doubt Wall', 
      emoji: '💬', 
      color: colors.secondaryLight,
      iconColor: colors.secondary,
      action: () => navigation.navigate('DoubtWall'),
    },
    { 
      id: 'score', 
      title: 'My Score', 
      emoji: '🎯', 
      color: colors.accentLight,
      iconColor: colors.accent,
      action: () => navigation.navigate('ReadinessScore'),
    },
    { 
      id: 'jobs', 
      title: 'Job Board', 
      emoji: '💼', 
      color: colors.successLight,
      iconColor: colors.success,
      action: () => navigation.navigate('JobBoard'),
    },
    { 
      id: 'outcome', 
      title: 'Outcome', 
      emoji: '📊', 
      color: '#EDE7F6',
      iconColor: colors.primaryDark,
      action: () => navigation.navigate('OutcomeDashboard'),
    },
    { 
      id: 'pause', 
      title: 'Pause', 
      emoji: '⏸️', 
      color: colors.warningLight,
      iconColor: colors.warning,
      action: () => navigation.navigate('PauseResume'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Background Decor */}
      <View style={styles.bgDecor1} />
      <View style={styles.bgDecor2} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Priya! 👋</Text>
          <Text style={styles.subtitle}>Ready to learn today?</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👩</Text>
          <View style={styles.onlineDot} />
        </View>
      </View>

      {/* Progress Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
        {/* Momentum Score */}
        <View style={[styles.card, styles.momentumCard]}>
          <Text style={styles.cardLabel}>🔥 Momentum</Text>
          <Text style={styles.cardValue}>{progress.momentumScore}%</Text>
          <View style={styles.cardBar}>
            <View style={[styles.cardBarFill, { width: `${progress.momentumScore}%` }]} />
          </View>
          <Text style={styles.cardSubtext}>Keep going! 🚀</Text>
        </View>

        {/* Readiness Score */}
        <TouchableOpacity 
          style={[styles.card, styles.readinessCard]}
          onPress={() => navigation.navigate('ReadinessScore')}
          activeOpacity={0.8}
        >
          <Text style={styles.cardLabel}>📊 Readiness</Text>
          <Text style={[styles.cardValue, { color: colors.secondary }]}>
            {progress.overallScore}%
          </Text>
          <View style={styles.cardBar}>
            <View style={[styles.cardBarFill, { 
              width: `${progress.overallScore}%`,
              backgroundColor: colors.secondary,
            }]} />
          </View>
          <Text style={styles.cardSubtext}>Tap to view breakdown →</Text>
        </TouchableOpacity>

        {/* Lessons Card */}
        <View style={[styles.card, styles.lessonsCard]}>
          <Text style={styles.cardLabel}>📚 Lessons</Text>
          <Text style={[styles.cardValue, { color: colors.accent }]}>
            {progress.lessonsCompleted || 4}
          </Text>
          <Text style={styles.cardSubtext}>Completed so far 🎉</Text>
        </View>
      </ScrollView>

      {/* Quick Actions Grid */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { backgroundColor: action.color }]}
              onPress={action.action}
              activeOpacity={0.7}
            >
              <Text style={styles.actionEmoji}>{action.emoji}</Text>
              <Text style={[styles.actionTitle, { color: action.iconColor }]}>
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Next Steps */}
      <View style={styles.nextStepsSection}>
        <Text style={styles.sectionTitle}>🔍 What to Fix Next</Text>
        {progress.nextSteps?.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepBullet} />
            <Text style={styles.stepText}>{step}</Text>
            <Text style={styles.stepArrow}>→</Text>
          </View>
        ))}
      </View>

      {/* Pause Button */}
      <TouchableOpacity 
        style={styles.pauseButton}
        onPress={() => navigation.navigate('PauseResume')}
        activeOpacity={0.7}
      >
        <Text style={styles.pauseIcon}>⏸️</Text>
        <Text style={styles.pauseText}>Life Happens? Pause Learning</Text>
        <Text style={styles.pauseArrow}>→</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bgDecor1: {
    position: 'absolute',
    top: -150,
    right: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: colors.primaryLight,
    opacity: 0.2,
  },
  bgDecor2: {
    position: 'absolute',
    bottom: -100,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.secondaryLight,
    opacity: 0.15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  greeting: {
    ...typography.h1,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    fontSize: 40,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.textWhite,
  },
  cardsScroll: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  card: {
    width: width * 0.4,
    padding: spacing.md,
    borderRadius: borderRadius.large,
    marginRight: spacing.md,
    ...shadows.medium,
  },
  momentumCard: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  readinessCard: {
    backgroundColor: colors.secondaryLight,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  lessonsCard: {
    backgroundColor: colors.accentLight,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  cardLabel: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  cardValue: {
    ...typography.display,
    color: colors.primary,
    fontWeight: '800',
    marginVertical: spacing.xs,
  },
  cardBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: borderRadius.small,
    overflow: 'hidden',
  },
  cardBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.small,
  },
  cardSubtext: {
    ...typography.tiny,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actionsSection: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionCard: {
    width: '30%',
    aspectRatio: 1,
    padding: spacing.md,
    borderRadius: borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  actionEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  actionTitle: {
    ...typography.tiny,
    fontWeight: '600',
    textAlign: 'center',
  },
  nextStepsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.medium,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  stepBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  stepText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  stepArrow: {
    ...typography.body,
    color: colors.textLight,
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.warningLight,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: colors.warning,
    ...shadows.small,
  },
  pauseIcon: {
    fontSize: 20,
  },
  pauseText: {
    ...typography.body,
    color: colors.warning,
    fontWeight: '600',
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  pauseArrow: {
    ...typography.body,
    color: colors.warning,
  },
});

export default DashboardScreen;