import { lightColors, darkColors } from './colors';

export const typography = {
  fontFamily: 'Inter-Regular',
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const glassmorphism = (isDarkMode) => ({
  backgroundColor: isDarkMode ? darkColors.cardBackground : lightColors.cardBackground,
  borderColor: isDarkMode ? darkColors.cardBorder : lightColors.cardBorder,
  borderWidth: 1,
  borderRadius: 20,
  shadowColor: isDarkMode ? darkColors.shadowColor : lightColors.shadowColor,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: isDarkMode ? 0.25 : 0.15,
  shadowRadius: 16,
  elevation: 5,
});