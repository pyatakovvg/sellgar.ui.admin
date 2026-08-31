import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandCreateRoute, BrandRoute, ProductsRoute } from '@library/route-tokens';
import { useLoaderData, useNavigate } from '@sellgar/app-v2/native';

import { BrandsControllerInterface } from '../classes/controller/brands/brands-controller.interface.ts';

export const ModuleView: React.FC = () => {
  const navigate = useNavigate();
  const runtime = useLoaderData(BrandsControllerInterface);

  return (
    <View style={styles.content}>
      <Text style={styles.eyebrow}>Brands tab</Text>
      <Text style={styles.title}>Brands</Text>
      <Text style={styles.copy}>Switching tabs must retain the previous core runtime and its controller state.</Text>
      <Text style={styles.probe}>
        controller #{runtime.instance}, loader #{runtime.loads}, {runtime.duration} ms
      </Text>
      <Pressable
        accessibilityLabel="Open brand drawer"
        accessibilityRole="button"
        onPress={() => void navigate.to(BrandCreateRoute)}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        <Text style={styles.buttonText}>Open brand drawer</Text>
      </Pressable>
      <Pressable
        accessibilityLabel="Open products tab"
        accessibilityRole="button"
        onPress={() => void navigate.to(ProductsRoute)}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        <Text style={styles.buttonText}>Open products tab</Text>
      </Pressable>
      <Pressable
        accessibilityLabel="Open brand #45"
        accessibilityRole="button"
        onPress={() => void navigate.to(BrandRoute, { params: { uuid: '45' } })}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        <Text style={styles.buttonText}>Open brand #45</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: '#9d91ff', borderRadius: 14, height: 52, justifyContent: 'center' },
  buttonText: { color: '#11131a', fontSize: 16, fontWeight: '700' },
  content: { flex: 1, gap: 16, justifyContent: 'center', padding: 24, backgroundColor: '#11131a' },
  copy: { color: '#a9adba', fontSize: 16, lineHeight: 23 },
  eyebrow: { color: '#9d91ff', fontSize: 13, fontWeight: '700', letterSpacing: 0.6 },
  pressed: { opacity: 0.78 },
  probe: { color: '#6fd6b3', fontSize: 14, fontWeight: '700' },
  title: { color: '#f7f7fb', fontSize: 34, fontWeight: '800' },
});
