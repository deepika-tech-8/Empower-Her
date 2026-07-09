// mobile/src/screens/PauseResumeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const PauseResumeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏸️ Life Happens</Text>
      <Text style={styles.body}>Your progress is frozen. No penalties, no guilt.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>📥 Resume Learning</Text>
      </TouchableOpacity>
      <Text style={styles.recap}>Welcome back! You paused 3 days ago.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background, alignItems: 'center' },
  title: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary },
  body: { fontSize: typography.body, textAlign: 'center', marginVertical: spacing.md },
  button: { padding: spacing.md, backgroundColor: colors.success, borderRadius: 8, marginVertical: spacing.md },
  buttonText: { color: colors.white, fontWeight: 'bold' },
  recap: { fontSize: typography.body, color: colors.textSecondary },
});

export default PauseResumeScreen;