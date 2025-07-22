import { StyleSheet } from 'react-native';

// Cores do app
export const Colors = {
  primary: '#4A90E2',
  secondary: '#F39C12',
  danger: '#E74C3C',
  success: '#27AE60',
  warning: '#F1C40F',
  dark: '#2D336B',
  light: '#A9B5DF',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#666666',
  lightGray: '#F5F5F5',
  background: '#F8F9FA',
};

// Tamanhos de fonte
export const FontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 28,
  huge: 36,
};

// Espaçamentos
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Bordas
export const BorderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  circle: 50,
};

// Estilos globais reutilizáveis
export const GlobalStyles = StyleSheet.create({
  // Container padrão
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },

  // Títulos
  title: {
    fontSize: FontSizes.xxlarge,
    fontWeight: 'bold',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  subtitle: {
    fontSize: FontSizes.large,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: Spacing.md,
  },

  // Textos
  text: {
    fontSize: FontSizes.medium,
    color: Colors.dark,
    lineHeight: 24,
  },

  textLight: {
    fontSize: FontSizes.medium,
    color: Colors.light,
    fontStyle: 'italic',
  },

  // Botões
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  buttonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: '600',
  },

  buttonSecondary: {
    backgroundColor: Colors.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  buttonDanger: {
    backgroundColor: Colors.danger,
    padding: Spacing.md,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  // Cards
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Seções
  section: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    fontSize: FontSizes.medium,
    backgroundColor: Colors.white,
    marginBottom: Spacing.sm,
  },

  // Centro
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Flexbox helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
