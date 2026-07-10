// mobile/src/screens/OnboardingScreen.js - UNIQUE DESIGN
import React, { useState, useRef } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, 
  StyleSheet, Animated, Dimensions, Image 
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { colors, typography, spacing, borderRadius, shadows, gradients, glass } from '../styles/theme';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const { setSchedule } = useProgress();
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState({
    goal: '',
    kidSleepTime: '',
    lunchBreak: '',
  });
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    } else {
      setSchedule(responses);
      navigation.replace('Dashboard');
    }
  };

  const options = {
    1: {
      question: "What's your dream career? 🎯",
      subtitle: "Let's find the perfect path for you",
      options: [
        { value: 'Data Analyst', emoji: '📊' },
        { value: 'Business Analyst', emoji: '💼' },
        { value: 'Data Entry', emoji: '📝' },
        { value: 'Data Scientist', emoji: '🧠' },
      ],
    },
    2: {
      question: "When do kids usually sleep? 👶",
      subtitle: "We'll schedule your learning around your routine",
      options: [
        { value: 'Before 8 PM', emoji: '🌙' },
        { value: '8-9 PM', emoji: '⭐' },
        { value: 'After 9 PM', emoji: '🌃' },
        { value: 'Not applicable', emoji: '💪' },
      ],
    },
    3: {
      question: "How long is your lunch break? 🍱",
      subtitle: "Perfect for micro-learning sessions",
      options: [
        { value: '15-20 min', emoji: '⚡' },
        { value: '30 min', emoji: '📚' },
        { value: '45-60 min', emoji: '🎯' },
        { value: 'Flexible', emoji: '🌈' },
      ],
    },
  };

  const currentStep = options[step];

  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <View style={styles.backgroundGradient} />
      
      {/* Decorative Circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />

      <Animated.View 
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>✨</Text>
            <Text style={styles.logoText}>ElevateHer</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressDots}>
              {[1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.progressDot,
                    i <= step && styles.progressDotActive,
                    i === step && styles.progressDotCurrent,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.stepText}>Step {step} of 3</Text>
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionEmoji}>
            {step === 1 ? '🎯' : step === 2 ? '👶' : '🍱'}
          </Text>
          <Text style={styles.question}>{currentStep.question}</Text>
          <Text style={styles.subtitle}>{currentStep.subtitle}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentStep.options.map((option) => {
            const selected = 
              step === 1 ? responses.goal === option.value :
              step === 2 ? responses.kidSleepTime === option.value :
              responses.lunchBreak === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionCard,
                  selected && styles.optionCardSelected,
                ]}
                onPress={() => {
                  const key = step === 1 ? 'goal' : step === 2 ? 'kidSleepTime' : 'lunchBreak';
                  setResponses({ ...responses, [key]: option.value });
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <Text style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}>
                  {option.value}
                </Text>
                {selected && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            (step === 1 && !responses.goal) ||
            (step === 2 && !responses.kidSleepTime) ||
            (step === 3 && !responses.lunchBreak)
              ? styles.nextButtonDisabled
              : null,
          ]}
          onPress={handleNext}
          disabled={
            (step === 1 && !responses.goal) ||
            (step === 2 && !responses.kidSleepTime) ||
            (step === 3 && !responses.lunchBreak)
          }
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {step === 3 ? 'Start Your Journey 🚀' : 'Next →'}
          </Text>
        </TouchableOpacity>

        {/* Skip for later */}
        {step < 3 && (
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => {
              if (step === 1) setResponses({ ...responses, goal: 'Data Analyst' });
              else if (step === 2) setResponses({ ...responses, kidSleepTime: 'After 9 PM' });
              else setResponses({ ...responses, lunchBreak: '30 min' });
              handleNext();
            }}
          >
            <Text style={styles.skipText}>Skip for later →</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
  },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primaryLight,
    opacity: 0.3,
  },
  circle2: {
    position: 'absolute',
    bottom: -50,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.secondaryLight,
    opacity: 0.3,
  },
  circle3: {
    position: 'absolute',
    top: '40%',
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accentLight,
    opacity: 0.2,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    marginRight: spacing.xs,
  },
  logoText: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '800',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressDots: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
  },
  progressDotCurrent: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
    ...shadows.glow,
  },
  stepText: {
    ...typography.tiny,
    color: colors.textLight,
  },
  questionContainer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  questionEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  question: {
    ...typography.h1,
    color: colors.textPrimary,
    fontWeight: '800',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  optionsContainer: {
    flex: 1,
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.large,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.small,
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    ...shadows.medium,
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  optionText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: '700',
  },
  nextButton: {
    padding: spacing.md,
    borderRadius: borderRadius.large,
    backgroundColor: colors.primary,
    alignItems: 'center',
    ...shadows.medium,
  },
  nextButtonDisabled: {
    backgroundColor: colors.textLight,
    ...shadows.small,
  },
  nextButtonText: {
    ...typography.button,
    color: colors.textWhite,
    fontWeight: '700',
  },
  skipButton: {
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  skipText: {
    ...typography.body,
    color: colors.textLight,
  },
});

export default OnboardingScreen;