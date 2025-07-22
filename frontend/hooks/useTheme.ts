import { useColorScheme } from 'react-native';

const lightTheme = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  primary: '#4A90E2',
  secondary: '#F39C12',
  text: '#2D336B',
  textSecondary: '#A9B5DF',
  border: '#E0E0E0',
};

const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#4A90E2',
  secondary: '#F39C12',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  
  return {
    colors: colorScheme === 'dark' ? darkTheme : lightTheme,
    isDark: colorScheme === 'dark',
  };
};
