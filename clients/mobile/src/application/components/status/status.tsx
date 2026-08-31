import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface StatusProps {
  readonly loading?: boolean;
  readonly title: string;
  readonly tone?: 'default' | 'error';
}

export const Status: React.FC<StatusProps> = (props) => {
  return (
    <View style={styles.status}>
      {props.loading ? <ActivityIndicator color="#7c6cff" size="large" /> : null}
      <Text style={[styles.statusText, props.tone === 'error' ? styles.error : null]}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  error: { color: '#ff6b7a' },
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
