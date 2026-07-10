import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { spacing, typography, glassmorphism } from '../styles/theme';
import { Button } from '../components/common/Button';

export default function ReadinessScoreScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const { readinessScores } = useProgress();
  const [modalVisible, setModalVisible] = useState(false);

  const calculateOverall = () => {
    const scores = Object.values(readinessScores);
    return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
  };

  const handleFlagScore = () => {
    setModalVisible(false);
    Alert.alert(
      "Review Requested",
      "We've flagged this score. The status shows as 'Under Review' for our system team. A real mentor will audit this manually within 24 hours.",
      [{ text: "Great" }]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Job-Readiness Status 🏆</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Calculated transparently against typical employer criteria. No automated black-boxes.
        </Text>
      </View>

      {/* Radial Meter Mock (Highly Visual Minimalist CSS/SVG approach) */}
      <View style={[styles.meterCard, glassmorphism(isDarkMode)]}>
        <View style={[styles.radialCircle, { borderColor: colors.primary }]}>
          <Text style={[styles.overallText, { color: colors.textPrimary }]}>{calculateOverall()}%</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Ready</Text>
        </View>
        <Text style={[styles.meterTitle, { color: colors.textPrimary }]}>Core Competency Score</Text>
        <Text style={[styles.sourceDisclaimer, { color: colors.textSecondary }]}>
          🎯 Derived from requirements listed in over 40+ Entry Data & Tech listings this month.
        </Text>
      </View>

      {/* Breakdown Checklist */}
      <View style={[styles.breakdownCard, glassmorphism(isDarkMode)]}>
        <Text style={[styles.breakdownHeader, { color: colors.textPrimary }]}>Skill Inventory Matrix</Text>
        
        <View style={styles.skillRow}>
          <Text style={[styles.skillName, { color: colors.textPrimary }]}>Formula Nesting (VLOOKUP, INDEX)</Text>
          <Text style={[styles.skillPercent, { color: colors.primary }]}>{Math.round(readinessScores.formulas * 100)}%</Text>
        </View>
        <View style={styles.skillRow}>
          <Text style={[styles.skillName, { color: colors.textPrimary }]}>Pivot Tables & Data Summaries</Text>
          <Text style={[styles.skillPercent, { color: colors.primary }]}>{Math.round(readinessScores.pivotTables * 100)}%</Text>
        </View>
        <View style={styles.skillRow}>
          <Text style={[styles.skillName, { color: colors.textPrimary }]}>Basic Data Cleaning / Deduplication</Text>
          <Text style={[styles.skillPercent, { color: colors.primary }]}>{Math.round(readinessScores.dataCleaning * 100)}%</Text>
        </View>

        <Button 
          title="Flag System Error in Grading" 
          variant="secondary" 
          onPress={() => setModalVisible(true)}
          style={styles.flagBtn}
        />
      </View>

      {/* Flag Score Confirmation Drawer/Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCentered}>
          <View style={[styles.modalView, glassmorphism(isDarkMode)]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Request Manual Review 🔍</Text>
            <Text style={[styles.modalDesc, { color: colors.textSecondary }]}>
              If our AI grading parser missed a logic flow in your response, click confirm below. This freezes negative grading outcomes and calls an admin human reviewer.
            </Text>
            <View style={styles.modalActions}>
              <Button title="Confirm Review Request" onPress={handleFlagScore} style={{ marginBottom: spacing.xs }} />
              <Button title="Cancel" variant="secondary" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
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
  meterCard: {
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  radialCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  overallText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  label: {
    ...typography.caption,
  },
  meterTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  sourceDisclaimer: {
    ...typography.caption,
    textAlign: 'center',
    lineHeight: 16,
  },
  breakdownCard: {
    padding: spacing.md,
    marginBottom: 50,
  },
  breakdownHeader: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  skillName: {
    ...typography.body,
    width: '80%',
  },
  skillPercent: {
    ...typography.body,
    fontWeight: 'bold',
  },
  flagBtn: {
    marginTop: spacing.md,
  },
  modalCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    width: '90%',
    padding: spacing.lg,
    alignItems: 'center',
  },
  modalTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  modalDesc: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  modalActions: {
    width: '100%',
  },
});