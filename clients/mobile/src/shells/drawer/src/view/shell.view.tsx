import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ShellScrollView, type ShellContextInterface, useShell, useSafeAreaInsets } from '@sellgar/app-v2/native';

export const ShellView: React.FC<ShellContextInterface> = (props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.surface, { marginTop: top + 24 }]}>
      <View style={styles.header}>
        <View style={styles.grabber} />
      </View>
      <ShellScrollView contentContainerStyle={styles.content}>{props.children}</ShellScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 0,
  },
  grabber: {
    backgroundColor: '#666b7a',
    borderRadius: 2,
    height: 4,
    width: 40,
    marginHorizontal: 'auto',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 24,
    paddingHorizontal: 12,
  },
  surface: {
    backgroundColor: '#171a23',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 12,
    flexShrink: 1,
    maxHeight: '100%',
    overflow: 'hidden',
  },
});
