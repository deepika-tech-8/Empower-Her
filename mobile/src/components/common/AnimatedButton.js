// mobile/src/components/common/AnimatedButton.js
import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { colors, typography, borderRadius, shadows } from '../../styles/theme';

export const AnimatedButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  variant = 'primary',
  ...props 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      textColor: colors.textWhite,
    },
    secondary: {
      backgroundColor: colors.secondary,
      textColor: colors.textWhite,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      borderWidth: 2,
      textColor: colors.primary,
    },
    ghost: {
      backgroundColor: colors.primaryLight,
      textColor: colors.primary,
    },
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.button, variantStyles, style]}
        {...props}
      >
        <Text style={[styles.text, { color: variantStyles.textColor }, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  text: {
    ...typography.button,
    fontWeight: '600',
  },
});

export default AnimatedButton;