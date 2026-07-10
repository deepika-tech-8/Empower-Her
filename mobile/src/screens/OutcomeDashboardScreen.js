import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography, glassmorphism } from '../styles/theme';

export default function OutcomeDashboardScreen() {
  const { colors, isDarkMode } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Conversion Funnel 📈</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Real outcome tracking. We track interviews landed and hiring actions, not just screen-time or completion counts.
        </Text>
      </View>

      {/* Structured Glassmorphic Pipeline Funnel */}
      <View style={[styles.funnelContainer, glassmorphism(isDarkMode)]}>
        <Text style={[styles.funnelTitle, { color: colors.textPrimary }]}>Cohort Job Placement Metrics</Text>
        <Text style={[styles.disclaimer, { color: colors.textSecondary }]}>
          ⚠️ Labeled Transparently: Projected targets modeled for Phase 1 cohort scaling.
        </Text>

        <View style={styles.funnelStep}>
          <View style={[styles.bar, { width: '100%', backgroundColor: colors.primary }]} />
          <Text style={[styles.stepLabel, { color: colors.textPrimary }]}>Lessons Completed: 100%</Text>
        </View>

        <View style={styles.funnelStep}>
          <View style={[styles.bar, { width: '78%', backgroundColor: colors.primary }]} />
          <Text style={[styles.stepLabel, { color: colors.textPrimary }]}>Mock Interview Cleared: 78%</Text>
        </View>

        <View style={styles.funnelStep}>
          <View style={[styles.bar, { width: '52%', backgroundColor: colors.accent }]} />
          <Text style={[styles.stepLabel, { color: colors.textPrimary }]}>Active Applications Sent: 52%</Text>
        </View>

        <View style={styles.funnelStep}>
          <View style={[styles.bar, { width: '31%', backgroundColor: colors.accentWarm }]} />
          <Text style={[styles.stepLabel, { color: colors.textPrimary }]}>Completed Interviews: 31%</Text>
        </View>
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
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.body,
    marginTop: 4,
  },
  funnelContainer: {
    padding: spacing.md,
    marginBottom: 50,
  },
  funnelTitle: {
    ...typography.h2,
    marginBottom: 4,
  },
  disclaimer: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  funnelStep: {
    marginVertical: spacing.sm,
  },
  bar: {
    height: 14,
    borderRadius: 7,
    marginBottom: 4,
  },
  stepLabel: {
    ...typography.caption,
    fontWeight: '600',
  },
});