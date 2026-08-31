import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { useSafeAreaInsets, useSubmit } from '@sellgar/app-v2/native';

import { SignOutControllerInterface } from '../classes/controller/sign-out-controller.interface.ts';

export const WidgetView: React.FC = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const submit = useSubmit(SignOutControllerInterface);

  return (
    <Pressable
      accessibilityLabel="Sign out"
      accessibilityRole="button"
      disabled={submit.inProcess}
      onPress={() => void submit()}
      style={({ pressed }) => [styles.root, { paddingBottom: safeAreaInsets.bottom }, pressed ? styles.pressed : null]}
    >
      {submit.inProcess ? <ActivityIndicator color="#f7f7fb" /> : <Text style={styles.label}>Exit</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: { color: '#f7f7fb', fontSize: 13, fontWeight: '700' },
  pressed: { opacity: 0.72 },
  root: { alignItems: 'center', justifyContent: 'center', minHeight: 52, minWidth: 70 },
});
