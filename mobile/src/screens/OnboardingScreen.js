// mobile/src/screens/OnboardingScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

const OnboardingScreen = ({ navigation }) => {
  const { setSchedule } = useProgress();
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({
    goal: '',
    kidSleepTime: '',
    lunchBreak: '',
    commitments: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSchedule(responses);
      navigation.replace('Dashboard');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>What's your career goal? 🎯</Text>
            {['Data Analyst', 'Business Analyst', 'Data Entry', 'Data Scientist'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.option, responses.goal === option && styles.selected]}
                onPress={() => setResponses({ ...responses, goal: option })}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>When do kids usually sleep? 👶</Text>
            {['Before 8 PM', '8-9 PM', 'After 9 PM', 'Not applicable'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.option, responses.kidSleepTime === option && styles.selected]}
                onPress={() => setResponses({ ...responses, kidSleepTime: option })}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>How long is your lunch break? 🍱</Text>
            {['15-20 min', '30 min', '45-60 min', 'Flexible'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.option, responses.lunchBreak === option && styles.selected]}
                onPress={() => setResponses({ ...responses, lunchBreak: option })}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ElevateHer Learn</Text>
        <Text style={styles.subtitle}>Learning that survives real life</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
        </View>
        <Text style={styles.stepText}>Step {step} of 3</Text>
      </View>

      {renderStep()}

      <TouchableOpacity
        style={[
          styles.nextButton,
          (!responses.goal || (step === 2 && !responses.kidSleepTime) || (step === 3 && !responses.lunchBreak)) && styles.disabled,
        ]}
        onPress={handleNext}
        disabled={!responses.goal || (step === 2 && !responses.kidSleepTime) || (step === 3 && !responses.lunchBreak)}
      >
        <Text style={styles.nextButtonText}>
          {step === 3 ? 'Start Learning 🚀' : 'Next →'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, alignItems: 'center', backgroundColor: colors.card },
  title: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary },
  subtitle: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  progressBar: { width: '100%', height: 6, backgroundColor: colors.border, borderRadius: borderRadius.small, marginTop: spacing.md },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: borderRadius.small },
  stepText: { fontSize: typography.small, color: colors.textSecondary, marginTop: spacing.xs },
  stepContainer: { padding: spacing.lg },
  question: { fontSize: typography.h2, fontWeight: 'bold', marginBottom: spacing.md },
  option: { padding: spacing.md, borderRadius: borderRadius.medium, marginVertical: spacing.xs, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  selected: { backgroundColor: colors.primaryLight, borderColor: colors.primary, borderWidth: 2 },
  optionText: { fontSize: typography.body, color: colors.textPrimary },
  nextButton: { margin: spacing.lg, padding: spacing.md, backgroundColor: colors.primary, borderRadius: borderRadius.medium, alignItems: 'center' },
  disabled: { backgroundColor: colors.textLight },
  nextButtonText: { color: colors.white, fontSize: typography.button, fontWeight: 'bold' },
});

export default OnboardingScreen;