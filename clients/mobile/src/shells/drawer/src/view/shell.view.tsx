import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ShellScrollView, type ShellContextInterface, useShell } from '@sellgar/app-v2/native';

export const ShellView: React.FC<ShellContextInterface> = (props) => {
  const shell = useShell();

  return (
    <View style={styles.surface}>
      <View style={styles.header}>
        <View style={styles.headerSide} />
        <View style={styles.grabber} />
        <Pressable
          accessibilityLabel="Close frame"
          accessibilityRole="button"
          hitSlop={12}
          onPress={shell.close}
          style={({ pressed }) => [styles.close, pressed ? styles.pressed : null]}
        >
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      </View>
      <ShellScrollView contentContainerStyle={styles.content}>{props.children}</ShellScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  close: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  closeText: {
    color: '#d7d9e2',
    fontSize: 28,
    lineHeight: 30,
  },
  grabber: {
    backgroundColor: '#666b7a',
    borderRadius: 2,
    height: 4,
    width: 40,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: 12,
  },
  headerSide: {
    width: 36,
  },
  pressed: {
    opacity: 0.6,
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
