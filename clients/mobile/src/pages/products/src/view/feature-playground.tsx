import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import {
  NavigationBlockerPresentation,
  type NavigationBlockerViewProps,
  useBlocker,
  useNotification,
  useUserRequest,
} from '@sellgar/app-v2/native';

import { Dialog } from '../../../../shared/ui/dialog';

import { Action } from './action.tsx';

const LocalNavigationBlocker: React.FC<NavigationBlockerViewProps> = (props) => (
  <Dialog
    actions={[
      { label: 'Keep editing', onPress: props.stay },
      { label: 'Discard', onPress: props.leave, tone: 'destructive' },
    ]}
    description="This presentation belongs to the Products screen registration."
    title="Local Products blocker"
  />
);

const localBlockerPresentation = NavigationBlockerPresentation.define(LocalNavigationBlocker);

export const FeaturePlayground: React.FC = () => {
  const notification = useNotification();
  const request = useUserRequest();
  const [blockNavigation, setBlockNavigation] = React.useState(false);
  const [localPresentation, setLocalPresentation] = React.useState(false);
  const [requestResult, setRequestResult] = React.useState('none');
  const [keyboardInput, setKeyboardInput] = React.useState('');
  const [keyboardResult, setKeyboardResult] = React.useState('none');

  useBlocker(blockNavigation, localPresentation ? { presentation: localBlockerPresentation } : undefined);

  const openRequestQueue = (): void => {
    void request.alert({
      description: 'The confirm request is already queued behind this alert.',
      title: 'First FIFO request',
    });
    void request
      .confirm({
        applyText: 'Accept',
        cancelText: 'Reject',
        description: 'This request opens only after the alert is resolved.',
        title: 'Second FIFO request',
      })
      .then((result) => setRequestResult(`confirm: ${String(result)}`));
  };

  const openPrompt = (): void => {
    void request
      .prompt({
        applyText: 'Save',
        cancelText: 'Cancel',
        defaultValue: 'native',
        description: 'The result is returned by the application-scoped core queue.',
        placeholder: 'Value',
        title: 'Prompt request',
      })
      .then((result) => setRequestResult(`prompt: ${result ?? 'cancelled'}`));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Application features</Text>
      <Text style={styles.result}>last request result: {requestResult}</Text>
      <Action
        label="Show auto-close notification"
        onPress={() =>
          notification.show({
            autoClose: true,
            description: 'The core timer owns closing; Native owns this presentation.',
            placement: 'top-center',
            status: 'success',
            title: 'Native notification',
          })
        }
      />
      <Action
        label="Show persistent destructive notification"
        onPress={() =>
          notification.show({
            description: 'Close it manually with the × button.',
            status: 'destructive',
            title: 'Persistent notification',
          })
        }
      />
      <Action label="Open FIFO user requests" onPress={openRequestQueue} />
      <Action label="Open prompt request" onPress={openPrompt} />
      <Action
        label={blockNavigation ? 'Disable navigation blocker' : 'Enable navigation blocker'}
        onPress={() => setBlockNavigation((value) => !value)}
        selected={blockNavigation}
      />
      <Action
        label={localPresentation ? 'Use global blocker presentation' : 'Use local blocker presentation'}
        onPress={() => setLocalPresentation((value) => !value)}
        selected={localPresentation}
      />
      <Text style={styles.hint}>Enable the blocker, then use a tab, link, frame, or Android Back.</Text>
      <Text style={styles.heading}>Keyboard and screen scroll</Text>
      <Text style={styles.hint}>Type a value and tap the action once.</Text>
      <TextInput
        accessibilityLabel="Keyboard test value"
        onChangeText={setKeyboardInput}
        placeholder="Keyboard test value"
        placeholderTextColor="#777d8e"
        style={styles.input}
        value={keyboardInput}
      />
      <Action label="Apply keyboard value" onPress={() => setKeyboardResult(keyboardInput || 'empty')} />
      <Text style={styles.result}>keyboard result: {keyboardResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: '#f7f7fb',
    fontSize: 20,
    fontWeight: '800',
  },
  hint: {
    color: '#a9adba',
    fontSize: 13,
    lineHeight: 19,
  },
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
  result: {
    color: '#6fd6b3',
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    borderColor: '#343949',
    borderRadius: 18,
    borderWidth: 1,
    gap: 12,
    marginTop: 8,
    padding: 16,
  },
});
