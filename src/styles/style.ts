import { StyleSheet } from 'react-native';

const masterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  textPrimary: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonPrimary: {
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export const COLORS = {
  primary: '#E91E63',
  background: '#f5f5f5',
  textPrimary: '#333',
  textSecondary: '#777',
  border: '#e0e0e0',
  danger: '#ff5252',
  warning: '#ff9800',
  success: '#4caf50',
  darkGray: '#444',
  lightGray: '#f5f5f5',
  white: '#fff',
  black: '#000',
};

export default masterStyles;
