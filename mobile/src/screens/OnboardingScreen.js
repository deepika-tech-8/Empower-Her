import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography, glassmorphism } from '../styles/theme';
import { Button } from '../components/common/Button';

const { width } = Dimensions.get('window');

const ONBOARDING_QUESTIONS = [
  {
    id: 'schedule',
    title: 'Routine Anchor 🌸',
    question: 'When do you get your quiet moments during the day?',
    options: [
      { label: 'Morning before everyone wakes up', value: 'morning' },
      { label: 'During the afternoon quiet hours', value: 'afternoon' },
      { label: 'Late night winding-down time', value: 'night' },
    ],
  },
  {
    id: 'duration',
    title: 'Pocket Learning ⏱️',
    question: 'How long are your average free windows?',
    options: [
      { label: '5-10 minutes (micro-breaks)', value: '10m' },
      { label: '15-30 minutes (commutes/lunches)', value: '30m' },
      { label: '30+ minutes (structured slots)', value: '60m' },
    ],
  },
  {
    id: 'focus',
    title: 'Your Career Vision 🎯',
    question: 'What is your primary skill goal?',
    options: [
      { label: 'Mastering Excel formulas & analysis', value: 'excel' },
      { label: 'Python fundamentals for Tech switches', value: 'python' },
    ],
  },
];

export default function OnboardingScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleSelectOption = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const transitionToStep = (nextStep) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -30,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentStep(nextStep);
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      transitionToStep(currentStep + 1);
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const currentQ = ONBOARDING_QUESTIONS[currentStep];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.brand, { color: colors.primary }]}>ElevateHer Learn</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Cozy, Fragment-Time Reskilling</Text>
      </View>

      <Animated.View style={[
        styles.card, 
        glassmorphism(isDarkMode),
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}>
        <Text style={[styles.stepIndicator, { color: colors.primary }]}>
          Question {currentStep + 1} of {ONBOARDING_QUESTIONS.length}
        </Text>
        <Text style={[styles.questionTitle, { color: colors.textPrimary }]}>{currentQ.title}</Text>
        <Text style={[styles.questionText, { color: colors.textSecondary }]}>{currentQ.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQ.options.map((option) => {
            const isSelected = answers[currentQ.id] === option.value;
            return (
              <Button
                key={option.value}
                title={option.label}
                variant={isSelected ? 'primary' : 'secondary'}
                onPress={() => handleSelectOption(currentQ.id, option.value)}
                style={styles.optionButton}
              />
            );
          })}
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Button 
          title={currentStep === ONBOARDING_QUESTIONS.length - 1 ? 'Finish' : 'Next'} 
          onPress={handleNext}
          style={styles.navButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  brand: {
    ...typography.h1,
    fontFamily: typography.fontFamily,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 4,
  },
  card: {
    padding: spacing.lg,
    marginVertical: spacing.md,
  },
  stepIndicator: {
    ...typography.caption,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  questionTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  questionText: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  optionsContainer: {
    marginVertical: spacing.md,
  },
  optionButton: {
    marginVertical: spacing.sm,
    borderRadius: 15,
  },
  footer: {
    marginBottom: 20,
  },
  navButton: {
    width: '100%',
  },
});