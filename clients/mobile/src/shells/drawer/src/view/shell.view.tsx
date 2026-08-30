import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { ShellContextInterface } from '@sellgar/app-v2/native';

export const ShellView: React.FC<ShellContextInterface> = (props) => {
  return (
    <View style={styles.surface}>
      <View style={styles.grabber} />
      <View style={styles.content}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  grabber: {
    alignSelf: 'center',
    backgroundColor: '#666b7a',
    borderRadius: 2,
    height: 4,
    marginBottom: 8,
    marginTop: 10,
    width: 40,
  },
  surface: {
    backgroundColor: '#171a23',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 12,
    flex: 1,
    marginTop: '5%',
    overflow: 'hidden',
  },
});
