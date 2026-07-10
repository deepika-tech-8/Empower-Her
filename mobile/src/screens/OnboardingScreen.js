// mobile/src/screens/OnboardingScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { colors, typography, spacing } from '../styles/theme';

const OnboardingScreen = ({ navigation }) => {
  const { user, setUser } = useAuth();
  const { setSchedule } = useProgress();
  
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({
    goal: '',
    kidSleepTime: '',
    lunchBreakLength: '',
    weeklyCommitments: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save schedule and navigate to dashboard
      setSchedule(responses);
      navigation.replace('Dashboard');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to ElevateHer Learn</Text>
        <Text style={styles.subtitle}>Let's find your learning rhythm</Text>
      </View>

      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.question}>What's your career goal?</Text>
          <TouchableOpacity 
            style={[styles.option, responses.goal === 'Data Analyst' && styles.selected]}
            onPress={() => setResponses({...responses, goal: 'Data Analyst'})}
          >
            <Text style={styles.optionText}>Data Analyst</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.option, responses.goal === 'Business Analyst' && styles.selected]}
            onPress={() => setResponses({...responses, goal: 'Business Analyst'})}
          >
            <Text style={styles.optionText}>Business Analyst</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.option, responses.goal === 'Data Entry' && styles.selected]}
            onPress={() => setResponses({...responses, goal: 'Data Entry'})}
          >
            <Text style={styles.optionText}>Data Entry</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.question}>When do kids usually sleep?</Text>
          <TouchableOpacity style={styles.timeOption}>
            <Text>Before 8 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeOption}>
            <Text>8-9 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeOption}>
            <Text>After 9 PM</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.question}>How long is your lunch break?</Text>
          <TouchableOpacity style={styles.timeOption}>
            <Text>15-20 min</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeOption}>
            <Text>30 min</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeOption}>
            <Text>45-60 min</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {step === 3 ? 'Start Learning 🚀' : 'Next →'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, alignItems: 'center' },
  title: { fontSize: typography.h1, color: colors.primary, fontWeight: 'bold' },
  subtitle: { fontSize: typography.body, color: colors.textSecondary },
  stepContainer: { padding: spacing.lg },
  question: { fontSize: typography.h2, marginBottom: spacing.md },
  option: { 
    padding: spacing.md, 
    borderRadius: 8, 
    marginVertical: spacing.xs, 
    backgroundColor: colors.card 
  },
  selected: { backgroundColor: colors.primaryLight, borderColor: colors.primary, borderWidth: 2 },
  optionText: { fontSize: typography.body },
  timeOption: { 
    padding: spacing.md, 
    borderRadius: 8, 
    marginVertical: spacing.xs, 
    backgroundColor: colors.card,
    alignItems: 'center' 
  },
  nextButton: { 
    margin: spacing.lg, 
    padding: spacing.md, 
    backgroundColor: colors.primary, 
    borderRadius: 8,
    alignItems: 'center' 
  },
  nextButtonText: { color: colors.white, fontSize: typography.button, fontWeight: 'bold' },
});

export default OnboardingScreen;