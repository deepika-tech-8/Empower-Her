// mobile/src/screens/JobBoardScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Linking,
  Alert 
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

const JobBoardScreen = () => {
  const { progress } = useProgress();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  // Mock job data (replace with real API later)
  useEffect(() => {
    const mockJobs = [
      {
        id: '1',
        title: 'Data Entry Specialist',
        company: 'ABC Corp',
        location: 'Remote',
        salary: '₹25,000 - ₹30,000/month',
        requirements: ['Excel', 'Data Entry'],
        posted: '2 days ago',
        diversityHire: true,
        description: 'Looking for a detail-oriented Data Entry Specialist to join our team. Must be proficient in Excel and data management.',
        applyLink: 'mailto:careers@abccorp.com?subject=Data Entry Application',
      },
      {
        id: '2',
        title: 'Junior Data Analyst',
        company: 'Tech Solutions',
        location: 'Mumbai, India',
        salary: '₹35,000 - ₹45,000/month',
        requirements: ['Excel', 'SQL', 'Data Visualization'],
        posted: '5 days ago',
        diversityHire: true,
        description: 'Join our analytics team as a Junior Data Analyst. Work with large datasets and create meaningful insights.',
        applyLink: 'mailto:hr@techsolutions.com?subject=Data Analyst Application',
      },
      {
        id: '3',
        title: 'Operations Associate',
        company: 'Global Logistics',
        location: 'Bangalore, India',
        salary: '₹28,000 - ₹35,000/month',
        requirements: ['Excel', 'Communication'],
        posted: '1 day ago',
        diversityHire: false,
        description: 'Support our operations team with data management and process optimization. Excel skills required.',
        applyLink: 'mailto:careers@globallogistics.com?subject=Operations Application',
      },
      {
        id: '4',
        title: 'Finance Assistant',
        company: 'FinTech Co',
        location: 'Hyderabad, India',
        salary: '₹30,000 - ₹40,000/month',
        requirements: ['Excel', 'Finance Basics'],
        posted: '3 days ago',
        diversityHire: true,
        description: 'Assist our finance team with data analysis and reporting. Strong Excel skills required.',
        applyLink: 'mailto:hr@fintechco.com?subject=Finance Assistant Application',
      },
      {
        id: '5',
        title: 'HR Data Analyst',
        company: 'People First',
        location: 'Delhi, India',
        salary: '₹32,000 - ₹38,000/month',
        requirements: ['Excel', 'HR Basics', 'Analytics'],
        posted: '4 days ago',
        diversityHire: true,
        description: 'Help our HR team make data-driven decisions. Work with employee data and create reports.',
        applyLink: 'mailto:careers@peoplefirst.com?subject=HR Analyst Application',
      },
    ];
    setJobs(mockJobs);
  }, []);

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => job.diversityHire === (filter === 'diversity'));

  const isJobReady = progress?.overallScore >= 70;

  const handleApply = (job) => {
    if (!isJobReady) {
      Alert.alert(
        '🔒 Complete More Lessons',
        `You're at ${progress?.overallScore || 68}% readiness. Reach 70% to apply for jobs!`,
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    Alert.alert(
      '📧 Apply Now',
      `Are you ready to apply for "${job.title}" at ${job.company}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply', 
          onPress: () => {
            Linking.openURL(job.applyLink || 'mailto:careers@company.com');
          }
        }
      ]
    );
  };

  // Quick apply button (1-click apply)
  const handleQuickApply = (job) => {
    if (!isJobReady) {
      Alert.alert(
        '🔒 Unlock at 70%',
        `Your readiness score: ${progress?.overallScore || 68}%. Keep learning!`,
        [{ text: 'OK' }]
      );
      return;
    }
    Linking.openURL(job.applyLink || 'mailto:careers@company.com');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>💼 Job Board</Text>
        <Text style={styles.subtitle}>Find roles that match your skills</Text>
      </View>

      {/* Readiness Alert */}
      <View style={[styles.alertCard, { 
        backgroundColor: isJobReady ? colors.successLight : colors.warningLight 
      }]}>
        <Text style={[styles.alertTitle, { 
          color: isJobReady ? colors.success : colors.warning 
        }]}>
          {isJobReady ? '🎉 You\'re Ready to Apply!' : '📚 Complete more lessons to unlock jobs'}
        </Text>
        <Text style={styles.alertText}>
          {isJobReady 
            ? `You're at ${progress?.overallScore}% readiness. Apply to jobs below!` 
            : `Current readiness: ${progress?.overallScore || 68}%. Reach 70% to apply.`}
        </Text>
        {!isJobReady && (
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress?.overallScore || 68}%` }]} />
          </View>
        )}
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterChipText, filter === 'all' && styles.filterChipTextActive]}>
            All Jobs ({jobs.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterChip, filter === 'diversity' && styles.filterChipActive]}
          onPress={() => setFilter('diversity')}
        >
          <Text style={[styles.filterChipText, filter === 'diversity' && styles.filterChipTextActive]}>
            🌈 Diversity Hiring
          </Text>
        </TouchableOpacity>
      </View>

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No jobs match this filter</Text>
        </View>
      ) : (
        filteredJobs.map((job) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              {job.diversityHire && (
                <View style={styles.diversityBadge}>
                  <Text style={styles.diversityBadgeText}>🌈 Diversity</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.companyName}>{job.company} • {job.location}</Text>
            <Text style={styles.salary}>💰 {job.salary}</Text>
            
            <Text style={styles.jobDescription} numberOfLines={2}>
              {job.description}
            </Text>

            <View style={styles.requirementsRow}>
              {job.requirements.map((req, index) => (
                <View key={index} style={styles.requirementTag}>
                  <Text style={styles.requirementText}>{req}</Text>
                </View>
              ))}
            </View>

            <View style={styles.jobFooter}>
              <Text style={styles.postedDate}>📅 {job.posted}</Text>
              <TouchableOpacity 
                style={[
                  styles.applyButton,
                  !isJobReady && styles.applyButtonDisabled
                ]}
                onPress={() => handleApply(job)}
                disabled={false}
              >
                <Text style={styles.applyButtonText}>
                  {isJobReady ? 'Apply Now →' : '🔒 Unlock at 70%'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* Partner Companies */}
      <View style={styles.partnersContainer}>
        <Text style={styles.partnersTitle}>🤝 Hiring Partners</Text>
        <View style={styles.partnerRow}>
          <Text style={styles.partnerName}>ABC Corp</Text>
          <Text style={styles.partnerName}>Tech Solutions</Text>
          <Text style={styles.partnerName}>FinTech Co</Text>
        </View>
        <View style={styles.partnerRow}>
          <Text style={styles.partnerName}>Global Logistics</Text>
          <Text style={styles.partnerName}>People First</Text>
        </View>
        <Text style={styles.partnerSubtext}>+8 more companies hiring women</Text>
      </View>

      {/* Quick Apply Note */}
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          💡 Tip: Complete more lessons to unlock more job opportunities!
        </Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  
  header: { 
    padding: spacing.lg, 
    backgroundColor: colors.card, 
    ...shadows.small 
  },
  title: { 
    fontSize: typography.h1, 
    fontWeight: 'bold', 
    color: colors.primary 
  },
  subtitle: { 
    fontSize: typography.body, 
    color: colors.textSecondary,
    marginTop: spacing.xs 
  },

  alertCard: { 
    margin: spacing.md, 
    padding: spacing.md, 
    borderRadius: borderRadius.medium,
    ...shadows.small 
  },
  alertTitle: { 
    fontSize: typography.h3, 
    fontWeight: 'bold' 
  },
  alertText: { 
    fontSize: typography.body, 
    marginTop: spacing.xs,
    color: colors.textSecondary 
  },
  progressBar: {
    marginTop: spacing.sm,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: borderRadius.small,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.small,
  },

  filterRow: { 
    flexDirection: 'row', 
    padding: spacing.md, 
    gap: spacing.sm 
  },
  filterChip: { 
    paddingHorizontal: spacing.md, 
    paddingVertical: spacing.sm, 
    borderRadius: borderRadius.circle, 
    backgroundColor: colors.border,
    marginRight: spacing.sm 
  },
  filterChipActive: { 
    backgroundColor: colors.primary 
  },
  filterChipText: { 
    fontSize: typography.small, 
    color: colors.textSecondary 
  },
  filterChipTextActive: { 
    color: colors.white 
  },

  jobCard: { 
    margin: spacing.md, 
    padding: spacing.md, 
    backgroundColor: colors.card, 
    borderRadius: borderRadius.medium, 
    ...shadows.small 
  },
  jobHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  jobTitle: { 
    fontSize: typography.h3, 
    fontWeight: 'bold', 
    color: colors.textPrimary, 
    flex: 1 
  },
  diversityBadge: { 
    backgroundColor: colors.secondaryLight, 
    paddingHorizontal: spacing.sm, 
    paddingVertical: 2, 
    borderRadius: borderRadius.small 
  },
  diversityBadgeText: { 
    fontSize: typography.tiny, 
    color: colors.secondary, 
    fontWeight: 'bold' 
  },
  companyName: { 
    fontSize: typography.body, 
    color: colors.textSecondary, 
    marginVertical: spacing.xs 
  },
  salary: { 
    fontSize: typography.body, 
    fontWeight: 'bold', 
    color: colors.success 
  },
  jobDescription: { 
    fontSize: typography.body, 
    color: colors.textSecondary,
    marginVertical: spacing.sm,
    lineHeight: 20 
  },
  requirementsRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginVertical: spacing.sm, 
    gap: spacing.xs 
  },
  requirementTag: { 
    backgroundColor: colors.primaryLight, 
    paddingHorizontal: spacing.sm, 
    paddingVertical: 2, 
    borderRadius: borderRadius.small,
    marginRight: spacing.xs,
    marginBottom: spacing.xs 
  },
  requirementText: { 
    fontSize: typography.tiny, 
    color: colors.primary 
  },
  jobFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: spacing.sm 
  },
  postedDate: { 
    fontSize: typography.small, 
    color: colors.textLight 
  },
  applyButton: { 
    padding: spacing.sm, 
    backgroundColor: colors.primary, 
    borderRadius: borderRadius.medium, 
    paddingHorizontal: spacing.md 
  },
  applyButtonDisabled: { 
    backgroundColor: colors.textLight 
  },
  applyButtonText: { 
    color: colors.white, 
    fontSize: typography.small, 
    fontWeight: 'bold' 
  },

  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textLight,
  },

  partnersContainer: { 
    margin: spacing.lg, 
    padding: spacing.lg, 
    backgroundColor: colors.card, 
    borderRadius: borderRadius.large, 
    ...shadows.small 
  },
  partnersTitle: { 
    fontSize: typography.h3, 
    fontWeight: 'bold', 
    marginBottom: spacing.sm 
  },
  partnerRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: spacing.md,
    marginVertical: spacing.xs 
  },
  partnerName: { 
    fontSize: typography.body, 
    fontWeight: 'bold', 
    color: colors.primary 
  },
  partnerSubtext: { 
    fontSize: typography.small, 
    color: colors.textSecondary, 
    marginTop: spacing.sm 
  },

  noteContainer: { 
    margin: spacing.md, 
    padding: spacing.md, 
    backgroundColor: colors.primaryLight, 
    borderRadius: borderRadius.medium 
  },
  noteText: { 
    fontSize: typography.body, 
    color: colors.primary,
    textAlign: 'center' 
  },
});

export default JobBoardScreen;