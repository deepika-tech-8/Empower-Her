import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { typography, spacing } from '../../styles/theme';

export const Button = ({ title, onPress, variant = 'primary', style }) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const isSecondary = variant === 'secondary';

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: isSecondary ? colors.cardBackground : colors.primary,
      borderColor: isSecondary ? colors.primary : 'transparent',
      borderWidth: isSecondary ? 1.5 : 0,
    },
    style,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[buttonStyles, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={[
          styles.text, 
          { color: isSecondary ? colors.primary : colors.textInverse }
        ]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    ...typography.body,
    fontWeight: 'bold',
  },
});