import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { spacing, typography, glassmorphism } from '../styles/theme';
import { Button } from '../components/common/Button';
import { mockRecaps } from '../utils/mockData';

export default function PauseResumeScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const { isPaused, togglePauseMode, resumeTriggered, setResumeTriggered } = useProgress();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);

  const activeRecap = mockRecaps.vlookup_basics;

  const handleReturn = () => {
    setResumeTriggered(false);
    navigation.navigate('Dashboard');
  };

  const verifyAnswer = (ans) => {
    setSelectedAnswer(ans);
    setChecked(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {resumeTriggered ? (
        // The warm, structural Welcome Back Recap experience
        <View style={styles.recapContainer}>
          <Text style={[styles.welcomeText, { color: colors.primary }]}>Welcome Back! 🌸</Text>
          <Text style={[styles.motto, { color: colors.textPrimary }]}>No pressure. Let’s do a quick, cozy, 60-second recap to catch you up!</Text>

          <View style={[styles.recapCard, glassmorphism(isDarkMode)]}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>What you left off with:</Text>
            {activeRecap.bullets.map((b, i) => (
              <Text key={i} style={[styles.bulletPoint, { color: colors.textSecondary }]}>🌸 {b}</Text>
            ))}
          </View>

          {/* Micro Refresher Question to fire synapses */}
          <View style={[styles.refresherCard, glassmorphism(isDarkMode)]}>
            <Text style={[styles.refresherTitle, { color: colors.textPrimary }]}>Quick refresher check:</Text>
            <Text style={[styles.refresherText, { color: colors.textSecondary }]}>{activeRecap.refresherQuestion}</Text>

            <View style={styles.options}>
              {['FALSE', 'TRUE', 'VLOOKUP'].map(opt => (
                <Button
                  key={opt}
                  title={opt}
                  variant={selectedAnswer === opt ? 'primary' : 'secondary'}
                  onPress={() => verifyAnswer(opt)}
                  style={styles.optionBtn}
                />
              ))}
            </View>

            {checked && (
              <Text style={[
                styles.resultMessage, 
                { color: selectedAnswer === activeRecap.correctAnswer ? colors.primary : colors.textSecondary }
              ]}>
                {selectedAnswer === activeRecap.correctAnswer 
                  ? '🎯 Exactly! FALSE guarantees an exact value search.' 
                  : 'Almost! The answer was FALSE to enforce precise ID lookup matching.'}
              </Text>
            )}
          </View>

          <Button title="Resume Learning Pathway" onPress={handleReturn} />
        </View>
      ) : (
        // Traditional Pause-For-Life Toggle Screen
        <View style={styles.centerContainer}>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>"Life Happens" Space ☕</Text>
          <Text style={[styles.desc, { color: colors.textSecondary }]}>
            Family emergencies, physical rest, holidays, or child care shouldn’t erase your hard work. Freeze your reskilling dashboard to block momentum drops and complete them completely guilt-free.
          </Text>

          <View style={[styles.freezeStatusCard, glassmorphism(isDarkMode)]}>
            <Text style={[styles.statusLabel, { color: colors.textPrimary }]}>Your Status</Text>
            <Text style={[styles.statusValue, { color: isPaused ? colors.primary : colors.textSecondary }]}>
              {isPaused ? '🧊 FROZEN & PROTECTED' : '⚡ ACTIVE PATHWAY'}
            </Text>
          </View>

          <Button 
            title={isPaused ? 'Unfreeze & Resume' : 'Activate Freeze Protection'} 
            onPress={togglePauseMode}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  recapContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },
  welcomeText: {
    ...typography.h1,
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  motto: {
    ...typography.body,
    marginBottom: spacing.lg,
  },
  recapCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  bulletPoint: {
    ...typography.body,
    marginVertical: 4,
    lineHeight: 20,
  },
  refresherCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  refresherTitle: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  refresherText: {
    ...typography.body,
    marginVertical: spacing.xs,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  optionBtn: {
    paddingHorizontal: spacing.sm,
    borderRadius: 15,
  },
  resultMessage: {
    ...typography.caption,
    marginTop: spacing.sm,
    fontWeight: 'bold',
  },
  centerContainer: {
    alignItems: 'center',
  },
  heading: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  desc: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  freezeStatusCard: {
    width: '100%',
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  statusLabel: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  statusValue: {
    ...typography.h2,
    marginTop: 4,
  },
});