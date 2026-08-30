import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

interface ActionProps {
  readonly inProcess?: boolean;
  readonly label: string;
  readonly onPress: () => void;
  readonly selected?: boolean;
}

export const Action: React.FC<ActionProps> = (props) => (
  <Pressable
    accessibilityLabel={props.label}
    accessibilityRole="button"
    accessibilityState={{ busy: props.inProcess, selected: props.selected }}
    disabled={props.inProcess}
    onPress={props.onPress}
    style={({ pressed }) => [styles.button, props.selected ? styles.selected : null, pressed ? styles.pressed : null]}
  >
    {props.inProcess ? <ActivityIndicator color="#11131a" /> : <Text style={styles.buttonText}>{props.label}</Text>}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#9d91ff',
    borderRadius: 14,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#11131a',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
  selected: {
    backgroundColor: '#52d4a8',
  },
});
