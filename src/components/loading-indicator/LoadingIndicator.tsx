import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/style';

interface LoadingIndicatorProps {
  loadingText: string;
  color?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loadingText, color = COLORS.primary }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingIndicator;
