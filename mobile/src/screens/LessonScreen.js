// mobile/src/screens/LessonScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const LessonScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Snack Lesson</Text>
      <Text style={styles.subtitle}>VLOOKUP Explained in 5 Minutes</Text>
      <Text style={styles.body}>This is a placeholder. Full lesson coming soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  title: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary },
  subtitle: { fontSize: typography.h2, marginVertical: spacing.md },
  body: { fontSize: typography.body, color: colors.textSecondary },
});

export default LessonScreen;