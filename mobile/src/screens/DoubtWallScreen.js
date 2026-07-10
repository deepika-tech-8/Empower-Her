import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography, glassmorphism } from '../styles/theme';
import { Button } from '../components/common/Button';
import { doubtService } from '../services/doubtService';

export default function DoubtWallScreen() {
  const { colors, isDarkMode } = useTheme();
  const [doubts, setDoubts] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadDoubts();
  }, []);

  const loadDoubts = async () => {
    const list = await doubtService.fetchDoubts();
    setDoubts(list);
  };

  const handlePostDoubt = async () => {
    if (!newQuestion.trim()) return;
    setIsSubmitting(true);
    await doubtService.askDoubt(newQuestion, 'AI');
    setNewQuestion('');
    await loadDoubts();
    setIsSubmitting(false);
  };

  const handleVote = async (id) => {
    await doubtService.upvoteDoubt(id);
    setDoubts(prev => prev.map(d => d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d));
  };

  const filteredDoubts = doubts.filter(d => activeTab === 'ALL' || d.tier === activeTab);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Safe Doubt Wall 🌸</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Ask anything anonymously. No names, zero judgment. Over 1,200 learners have asked basic questions here.
        </Text>
      </View>

      {/* Segmented Filter Control */}
      <View style={[styles.tabs, glassmorphism(isDarkMode)]}>
        {['ALL', 'AI', 'PEER', 'MENTOR'].map(tab => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.tabText, { color: activeTab === tab ? colors.textInverse : colors.textPrimary }]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredDoubts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.doubtCard, glassmorphism(isDarkMode)]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.nickname, { color: colors.primary }]}>{item.userNickname}</Text>
              <View style={[styles.badge, { backgroundColor: colors.accent }]}>
                <Text style={styles.badgeText}>{item.tier} Solved</Text>
              </View>
            </View>
            <Text style={[styles.question, { color: colors.textPrimary }]}>{item.question}</Text>
            
            {item.answer ? (
              <View style={styles.answerSection}>
                <Text style={[styles.answerText, { color: colors.textSecondary }]}>
                  💡 {item.answer}
                </Text>
              </View>
            ) : (
              <Text style={[styles.pending, { color: colors.textSecondary }]}>⏳ Awaiting helper validation...</Text>
            )}

            <View style={styles.cardFooter}>
              <TouchableOpacity onPress={() => handleVote(item.id)} style={styles.voteBtn}>
                <Text style={styles.voteEmoji}>💗</Text>
                <Text style={[styles.voteCount, { color: colors.textSecondary }]}>{item.upvotes} learners have this same doubt</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Fixed Anonymous Input Bar */}
      <View style={[styles.inputBar, glassmorphism(isDarkMode)]}>
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholder="Type your beginner question here..."
          placeholderTextColor={colors.textSecondary}
          value={newQuestion}
          onChangeText={setNewQuestion}
        />
        <Button 
          title={isSubmitting ? "..." : "Ask Anonymously"} 
          onPress={handlePostDoubt} 
          style={styles.postBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    marginTop: 50,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.body,
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
    borderRadius: 25,
    marginBottom: spacing.md,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  doubtCard: {
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  nickname: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
  question: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  answerSection: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: spacing.sm,
    borderRadius: 10,
    marginBottom: spacing.sm,
  },
  answerText: {
    ...typography.body,
    lineHeight: 20,
  },
  pending: {
    ...typography.caption,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    paddingTop: spacing.xs,
  },
  voteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  voteCount: {
    ...typography.caption,
  },
  inputBar: {
    flexDirection: 'row',
    padding: spacing.sm,
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    fontSize: 14,
  },
  postBtn: {
    paddingHorizontal: spacing.md,
    borderRadius: 15,
  },
});