// mobile/src/screens/ReadinessScoreScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const ReadinessScoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Job-Readiness Score</Text>
      <Text style={styles.score}>68%</Text>
      <Text style={styles.subtitle}>Formulas: 85%</Text>
      <Text style={styles.subtitle}>Pivot Tables: 40%</Text>
      <Text style={styles.body}>Practice Pivot Tables to improve!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  title: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary },
  score: { fontSize: 48, fontWeight: 'bold', color: colors.secondary, marginVertical: spacing.md },
  subtitle: { fontSize: typography.h3, marginVertical: spacing.xs },
  body: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.md },
});

export default ReadinessScoreScreen;