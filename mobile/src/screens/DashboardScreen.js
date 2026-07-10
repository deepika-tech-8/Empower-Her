import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { spacing, typography, glassmorphism } from '../styles/theme';
import { Button } from '../components/common/Button';

export default function DashboardScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const { momentumScore, isPaused, togglePauseMode, helperPoints } = useProgress();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Elegant warm pulse animation representing steady learning flow
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.textPrimary }]}>Welcome back, Learner ☕</Text>
        <Text style={[styles.motto, { color: colors.textSecondary }]}>You are exactly where you need to be.</Text>
      </View>

      {/* Glassmorphic Momentum Panel */}
      <Animated.View style={[
        styles.momentumCard, 
        glassmorphism(isDarkMode), 
        { transform: [{ scale: pulseAnim }] }
      ]}>
        <View style={styles.momentumHeader}>
          <Text style={[styles.momentumTitle, { color: colors.textPrimary }]}>Momentum Rating</Text>
          <Text style={[styles.momentumValue, { color: colors.primary }]}>{momentumScore}%</Text>
        </View>
        <Text style={[styles.momentumDesc, { color: colors.textSecondary }]}>
          This is a progress rating that decreases slowly during pauses, avoiding strict day streaks so you feel zero guilt if you need to step away.
        </Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${momentumScore}%`, backgroundColor: colors.primary }]} />
        </View>
      </Animated.View>

      {/* Core Actions / Grid */}
      <View style={styles.quickActions}>
        <View style={[styles.miniCard, glassmorphism(isDarkMode)]}>
          <Text style={styles.emoji}>💻</Text>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Next Snack Lesson</Text>
          <Text style={[styles.cardSub, { color: colors.textSecondary }]}>Excel: Clean with VLOOKUP (5 min)</Text>
          <Button 
            title="Start" 
            onPress={() => navigation.navigate('Lesson')} 
            style={styles.actionBtn}
          />
        </View>

        <View style={[styles.miniCard, glassmorphism(isDarkMode)]}>
          <Text style={styles.emoji}>🏆</Text>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Job-Readiness</Text>
          <Text style={[styles.cardSub, { color: colors.textSecondary }]}>Your skills mapped against job markets.</Text>
          <Button 
            title="Check Score" 
            onPress={() => navigation.navigate('ReadinessScore')} 
            variant="secondary"
            style={styles.actionBtn}
          />
        </View>
      </View>

      {/* Guilt-Free Rest Panel */}
      <View style={[styles.pauseCard, glassmorphism(isDarkMode)]}>
        <Text style={[styles.pauseTitle, { color: colors.textPrimary }]}>
          {isPaused ? 'Learning is Paused 🌸' : 'Life getting busy? ☕'}
        </Text>
        <Text style={[styles.pauseDesc, { color: colors.textSecondary }]}>
          {isPaused 
            ? 'Take your time. We have locked your momentum rating. Ready to return?' 
            : 'Freeze your progression score at zero penalty. Resume anytime without losing pace.'}
        </Text>
        <Button 
          title={isPaused ? 'Resume Learning' : 'Pause for Life'} 
          onPress={togglePauseMode}
          variant={isPaused ? 'primary' : 'secondary'}
        />
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
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  greeting: {
    ...typography.h1,
  },
  motto: {
    ...typography.body,
    marginTop: 4,
  },
  momentumCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  momentumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  momentumTitle: {
    ...typography.h2,
  },
  momentumValue: {
    ...typography.h1,
  },
  momentumDesc: {
    ...typography.caption,
    lineHeight: 16,
    marginBottom: spacing.md,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  miniCard: {
    width: '48%',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...typography.body,
    fontWeight: 'bold',
  },
  cardSub: {
    ...typography.caption,
    marginVertical: spacing.xs,
    lineHeight: 14,
  },
  actionBtn: {
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },
  pauseCard: {
    padding: spacing.md,
    marginBottom: 50,
  },
  pauseTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  pauseDesc: {
    ...typography.caption,
    marginBottom: spacing.md,
    lineHeight: 16,
  },
});