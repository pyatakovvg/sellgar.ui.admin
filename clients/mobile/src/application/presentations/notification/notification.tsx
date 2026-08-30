import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { NotificationViewProps } from '@sellgar/app-v2/native';

type NotificationTone = 'destructive' | 'info' | 'success';

interface NotificationProps extends NotificationViewProps {
  readonly tone: NotificationTone;
}

const Notification: React.FC<NotificationProps> = ({ close, notification, tone }) => {
  return (
    <View accessibilityLiveRegion="polite" style={[styles.card, styles[tone]]}>
      <View style={styles.content}>
        {renderText(notification.title, styles.title)}
        {renderText(notification.description, styles.description)}
        {notification.slot}
      </View>
      <Pressable accessibilityLabel="Close notification" accessibilityRole="button" onPress={close} hitSlop={12}>
        <Text style={styles.close}>×</Text>
      </Pressable>
    </View>
  );
};

export const DestructiveNotification: React.FC<NotificationViewProps> = (props) => (
  <Notification {...props} tone="destructive" />
);

export const InfoNotification: React.FC<NotificationViewProps> = (props) => <Notification {...props} tone="info" />;

export const SuccessNotification: React.FC<NotificationViewProps> = (props) => (
  <Notification {...props} tone="success" />
);

const renderText = (content: React.ReactNode, style: object): React.ReactNode => {
  if (content === null || content === undefined || content === false) return null;

  return typeof content === 'string' || typeof content === 'number' ? <Text style={style}>{content}</Text> : content;
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    backgroundColor: '#20242f',
    borderLeftWidth: 4,
    borderRadius: 14,
    elevation: 8,
    flexDirection: 'row',
    gap: 12,
    maxWidth: 420,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: 340,
  },
  close: {
    color: '#d7d9e2',
    fontSize: 25,
    lineHeight: 25,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  description: {
    color: '#c4c8d4',
    fontSize: 14,
    lineHeight: 20,
  },
  destructive: {
    borderLeftColor: '#ff6476',
  },
  info: {
    borderLeftColor: '#8e82ff',
  },
  success: {
    borderLeftColor: '#52d4a8',
  },
  title: {
    color: '#f7f7fb',
    fontSize: 16,
    fontWeight: '800',
  },
});
