// mobile/src/styles/theme.js - AURORA THEME

export const colors = {
  // Primary - Warm Purple
  primary: '#7C3AED',
  primaryLight: '#EDE7F6',
  primaryDark: '#5B21B6',
  primaryGradient: ['#7C3AED', '#5B21B6'],
  
  // Secondary - Teal
  secondary: '#06B6D4',
  secondaryLight: '#E0F7FA',
  secondaryGradient: ['#06B6D4', '#0E7490'],
  
  // Accent - Amber
  accent: '#F59E0B',
  accentLight: '#FEF3C7',
  
  // Success - Emerald
  success: '#10B981',
  successLight: '#D1FAE5',
  
  // Danger - Rose
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  
  // Warning - Amber
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  
  // Background
  background: '#F8F9FA',
  backgroundGradient: ['#F8F9FA', '#EDE7F6'],
  
  // Card with glass effect
  card: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.3)',
  cardShadow: 'rgba(124, 58, 237, 0.08)',
  
  // Text
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',
  
  // Status
  offline: '#EF4444',
  online: '#10B981',
  
  // Gradients for backgrounds
  gradientSunset: ['#7C3AED', '#06B6D4'],
  gradientSunrise: ['#06B6D4', '#F59E0B'],
  gradientDark: ['#1F2937', '#0F172A'],
};

export const glass = {
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(124, 58, 237, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  dark: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  small: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  tiny: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  display: { fontSize: 48, fontWeight: '800', lineHeight: 56 },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
  xxl: 32,
  circle: 999,
};

export const shadows = {
  small: {
    shadowColor: 'rgba(124, 58, 237, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: 'rgba(124, 58, 237, 0.12)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: 'rgba(124, 58, 237, 0.16)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const gradients = {
  primary: ['#7C3AED', '#5B21B6'],
  secondary: ['#06B6D4', '#0E7490'],
  accent: ['#F59E0B', '#D97706'],
  sunset: ['#7C3AED', '#06B6D4'],
  sunrise: ['#06B6D4', '#F59E0B'],
  dark: ['#1F2937', '#0F172A'],
  card: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)'],
};

export const theme = {
  colors,
  glass,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
};

export default theme;