import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useLoaderData, useNavigate } from '@sellgar/app-v2/native';

import { BrandCreateControllerInterface } from '../classes/controller/brand-create/brand-create-controller.interface.ts';

export const ModuleView: React.FC = () => {
  const navigate = useNavigate();
  const data = useLoaderData(BrandCreateControllerInterface);
  const [showOverflow, setShowOverflow] = React.useState(false);
  const [keyboardInput, setKeyboardInput] = React.useState('');
  const [keyboardResult, setKeyboardResult] = React.useState('none');

  return (
    <View style={styles.content}>
      <Text style={styles.eyebrow}>Nested Router drawer</Text>
      <Text style={styles.title}>Create brand</Text>
      <Text style={styles.copy}>Prepared in {data.duration} ms. The Brands screen remains the owner underneath.</Text>
      <Pressable
        accessibilityLabel={showOverflow ? 'Hide overflow content' : 'Show overflow content'}
        accessibilityRole="button"
        onPress={() => setShowOverflow((value) => !value)}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        <Text style={styles.buttonText}>{showOverflow ? 'Hide overflow content' : 'Show overflow content'}</Text>
      </Pressable>
      {showOverflow
        ? Array.from({ length: 18 }, (_, index) => (
            <Text key={index} style={styles.row}>
              Scrollable frame content row {index + 1}
            </Text>
          ))
        : null}
      <Text style={styles.copy}>
        The first downward scroll dismisses the keyboard; the following gesture may close the frame.
      </Text>
      <TextInput
        accessibilityLabel="Frame keyboard test value"
        onChangeText={setKeyboardInput}
        placeholder="Frame keyboard test value"
        placeholderTextColor="#777d8e"
        style={styles.input}
        value={keyboardInput}
      />
      <Pressable
        accessibilityLabel="Apply frame keyboard value"
        accessibilityRole="button"
        onPress={() => setKeyboardResult(keyboardInput || 'empty')}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
      >
        <Text style={styles.buttonText}>Apply keyboard value</Text>
      </Pressable>
      <Text style={styles.result}>keyboard result: {keyboardResult}</Text>
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
  content: { gap: 16, padding: 24 },
  copy: { color: '#a9adba', fontSize: 16, lineHeight: 23 },
  eyebrow: { color: '#9d91ff', fontSize: 13, fontWeight: '700', letterSpacing: 0.6 },
  input: {
    backgroundColor: '#171a22',
    borderColor: '#4b5265',
    borderRadius: 12,
    borderWidth: 1,
    color: '#f7f7fb',
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  pressed: { opacity: 0.78 },
  result: { color: '#6fd6b3', fontSize: 14, fontWeight: '700' },
  row: {
    backgroundColor: '#222631',
    borderRadius: 12,
    color: '#d7d9e2',
    fontSize: 15,
    padding: 16,
  },
  title: { color: '#f7f7fb', fontSize: 30, fontWeight: '800' },
});
