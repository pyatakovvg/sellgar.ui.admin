import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useLoaderData, useNavigate } from '@sellgar/app-v2/native';

import { BrandControllerInterface } from '../classes/controller/brand/brand-controller.interface.ts';

export const ModuleView: React.FC = () => {
  const navigate = useNavigate();
  const runtime = useLoaderData(BrandControllerInterface);

  return (
    <View style={styles.content}>
      <Text style={styles.eyebrow}>Brands #45</Text>
      <Text style={styles.title}>Brand #45</Text>
      <Text style={styles.copy}>Switching tabs must retain the previous core runtime and its controller state.</Text>
      <Text style={styles.probe}>
        controller #{runtime.instance}, loader #{runtime.loads}, {runtime.duration} ms
      </Text>
      <Pressable
        accessibilityLabel="Back"
        accessibilityRole="button"
        onPress={() => void navigate.back()}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: '#9d91ff', borderRadius: 14, height: 52, justifyContent: 'center' },
  buttonText: { color: '#11131a', fontSize: 16, fontWeight: '700' },
  content: { flex: 1, gap: 16, justifyContent: 'center', padding: 24, backgroundColor: '#acacac' },
  copy: { color: '#a9adba', fontSize: 16, lineHeight: 23 },
  eyebrow: { color: '#9d91ff', fontSize: 13, fontWeight: '700', letterSpacing: 0.6 },
  pressed: { opacity: 0.78 },
  probe: { color: '#6fd6b3', fontSize: 14, fontWeight: '700' },
  title: { color: '#f7f7fb', fontSize: 34, fontWeight: '800' },
});
