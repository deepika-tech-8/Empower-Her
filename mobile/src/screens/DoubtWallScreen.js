// mobile/src/screens/DoubtWallScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const DoubtWallScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Doubt Wall</Text>
      <View style={styles.doubtCard}>
        <Text style={styles.question}>Why does VLOOKUP return #N/A?</Text>
        <Text style={styles.answer}>1,204 learners asked this. AI answer: Check for extra spaces!</Text>
        <Text style={styles.tier}>🤖 AI</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  title: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary },
  doubtCard: { padding: spacing.md, backgroundColor: colors.card, borderRadius: 8, marginVertical: spacing.md },
  question: { fontSize: typography.h3, fontWeight: 'bold' },
  answer: { fontSize: typography.body, marginVertical: spacing.sm },
  tier: { fontSize: typography.small, color: colors.primary },
});

export default DoubtWallScreen;