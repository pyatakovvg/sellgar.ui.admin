import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const Fallback: React.FC = (props) => {
  return (
    <View style={styles.status}>
      <ActivityIndicator color="#7c6cff" size="large" />
      <Text style={[styles.statusText]}>Загрузка...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    alignItems: 'center',
    backgroundColor: '#11131a',
    flex: 1,
    gap: 16,
    padding: 20,
    justifyContent: 'center',
  },
  statusText: { color: '#f5f6fb', fontSize: 18, fontWeight: '600' },
});
