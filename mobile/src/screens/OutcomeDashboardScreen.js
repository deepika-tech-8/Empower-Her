// mobile/src/screens/OutcomeDashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const OutcomeDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Outcome Dashboard</Text>
      <View style={styles.funnel}>
        <Text style={styles.funnelItem}>📚 Readiness Score: 68%</Text>
        <Text style={styles.funnelItem}>📝 Applications: 12</Text>
        <Text style={styles.funnelItem}>📞 Interviews: 3</Text>
        <Text style={styles.funnelItem}>🎉 Offers: 1</Text>
      </View>
      <Text style={styles.note}>*Projected metrics based on user data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  title: { fontSize: typography.h1, fontWeight: 'bold', color: colors.primary },
  funnel: { marginVertical: spacing.lg, padding: spacing.md, backgroundColor: colors.card, borderRadius: 8 },
  funnelItem: { fontSize: typography.h3, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  note: { fontSize: typography.small, color: colors.textLight, textAlign: 'center' },
});

export default OutcomeDashboardScreen;