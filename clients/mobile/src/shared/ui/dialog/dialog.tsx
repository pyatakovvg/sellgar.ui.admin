import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, type TextStyle, View } from 'react-native';

import { KeyboardScrollView } from '@sellgar/app-v2/native';

export interface DialogAction {
  readonly label: React.ReactNode;
  readonly onPress: () => void;
  readonly processing?: boolean;
  readonly tone?: 'default' | 'primary' | 'destructive';
}

interface DialogProps {
  readonly actions: readonly DialogAction[];
  readonly children?: React.ReactNode;
  readonly description?: React.ReactNode;
  readonly title?: React.ReactNode;
}

const DIALOG_ACTIONS_KEYBOARD_OFFSET = 80;

export const Dialog: React.FC<DialogProps> = (props) => {
  return (
    <KeyboardScrollView
      accessibilityViewIsModal
      bounces={false}
      bottomOffset={DIALOG_ACTIONS_KEYBOARD_OFFSET}
      contentContainerStyle={styles.backdrop}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={styles.surface}
    >
      <View style={styles.dialog}>
        {renderContent(props.title, styles.title)}
        {renderContent(props.description, styles.description)}
        {props.children}
        <View style={styles.actions}>
          {props.actions.map((action, index) => (
            <Pressable
              accessibilityRole="button"
              disabled={action.processing}
              key={index}
              onPress={action.onPress}
              style={({ pressed }) => [
                styles.action,
                action.tone === 'primary' ? styles.primary : null,
                action.tone === 'destructive' ? styles.destructive : null,
                pressed ? styles.pressed : null,
              ]}
            >
              {action.processing ? (
                <ActivityIndicator color="#f7f7fb" />
              ) : (
                renderContent(action.label, styles.actionText)
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </KeyboardScrollView>
  );
};

const renderContent = (content: React.ReactNode, style: TextStyle): React.ReactNode => {
  if (content === null || content === undefined || content === false) {
    return null;
  }

  return typeof content === 'string' || typeof content === 'number' ? <Text style={style}>{content}</Text> : content;
};

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    backgroundColor: '#292d39',
    borderRadius: 12,
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  actionText: {
    color: '#f7f7fb',
    fontSize: 15,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(3, 5, 10, 0.72)',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  description: {
    color: '#b9bdca',
    fontSize: 15,
    lineHeight: 22,
  },
  destructive: {
    backgroundColor: '#b6374a',
  },
  dialog: {
    backgroundColor: '#191c25',
    borderColor: '#343949',
    borderRadius: 20,
    borderWidth: 1,
    gap: 14,
    maxWidth: 440,
    padding: 20,
    width: '100%',
  },
  pressed: {
    opacity: 0.76,
  },
  primary: {
    backgroundColor: '#6657d9',
  },
  surface: {
    backgroundColor: 'rgba(3, 5, 10, 0.72)',
    flex: 1,
  },
  title: {
    color: '#f7f7fb',
    fontSize: 20,
    fontWeight: '800',
  },
});
