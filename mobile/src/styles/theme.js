// Colors
export const colors = {
  primary: '#6C63FF',
  primaryLight: '#E8E6FF',
  primaryDark: '#4A43D9',
  secondary: '#FF6B6B',
  secondaryLight: '#FFE8E8',
  success: '#2ECC71',
  successLight: '#E8F8F0',
  danger: '#E74C3C',
  dangerLight: '#FDE8E8',
  warning: '#F39C12',
  warningLight: '#FEF5E7',
  background: '#F8F9FA',
  card: '#FFFFFF',
  border: '#E9ECEF',
  textPrimary: '#2D3436',
  textSecondary: '#636E72',
  textLight: '#B2BEC3',
  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const typography = {
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  small: 14,
  tiny: 12,
  button: 16,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xl: 20,
  circle: 999,
};

export const shadows = {
  small: {
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const theme = { colors, typography, spacing, borderRadius, shadows };
export default theme;