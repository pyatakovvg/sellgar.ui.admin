import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSubmit } from '@sellgar/app-v2/native';

import { SignInControllerInterface } from '../classes/controller/sign-in-controller.interface.ts';

export const ModuleView: React.FC = () => {
  const submit = useSubmit(SignInControllerInterface);

  return (
    <View style={styles.root}>
      <Text style={styles.eyebrow}>Anonymous routing branch</Text>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.copy}>
        Authentication changes core SessionRuntimeState. Policies replace this branch with the protected one.
      </Text>
      <Pressable
        {...{
          accessibilityLabel: 'Sign in',
          accessibilityRole: 'button' as const,
        }}
        disabled={submit.inProcess}
        onPress={() => void submit()}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        {submit.inProcess ? <ActivityIndicator color="#11131a" /> : <Text style={styles.buttonText}>Sign in</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: '#9d91ff', borderRadius: 14, height: 52, justifyContent: 'center' },
  buttonText: { color: '#11131a', fontSize: 16, fontWeight: '700' },
  copy: { color: '#a9adba', fontSize: 16, lineHeight: 23 },
  eyebrow: { color: '#9d91ff', fontSize: 13, fontWeight: '700', letterSpacing: 0.6 },
  pressed: { opacity: 0.78 },
  root: { flex: 1, gap: 16, justifyContent: 'center', padding: 24 },
  title: { color: '#f7f7fb', fontSize: 34, fontWeight: '800' },
});
