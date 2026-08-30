import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useLoaderData, useNavigate } from '@sellgar/app-v2/native';

import { BrandCreateControllerInterface } from '../classes/controller/brand-create/brand-create-controller.interface.ts';

export const ModuleView: React.FC = () => {
  const navigate = useNavigate();
  const data = useLoaderData(BrandCreateControllerInterface);

  return (
    <View style={styles.content}>
      <Text style={styles.eyebrow}>Nested Router drawer</Text>
      <Text style={styles.title}>Create brand</Text>
      <Text style={styles.copy}>Prepared in {data.duration} ms. The Brands screen remains the owner underneath.</Text>
      <Pressable
        accessibilityLabel="Close brand drawer"
        accessibilityRole="button"
        onPress={() => void navigate.close()}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        <Text style={styles.buttonText}>Close drawer</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#9d91ff',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
  },
  buttonText: { color: '#11131a', fontSize: 16, fontWeight: '700' },
  content: { flex: 1, gap: 16, justifyContent: 'center', padding: 24 },
  copy: { color: '#a9adba', fontSize: 16, lineHeight: 23 },
  eyebrow: { color: '#9d91ff', fontSize: 13, fontWeight: '700', letterSpacing: 0.6 },
  pressed: { opacity: 0.78 },
  title: { color: '#f7f7fb', fontSize: 30, fontWeight: '800' },
});
