import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import type {
  UserRequestAlertViewProps,
  UserRequestConfirmViewProps,
  UserRequestPromptViewProps,
} from '@sellgar/app-v2/native';
import { useScreenAutoFocus } from '@sellgar/app-v2/native';

import { Dialog } from '../../../shared/ui/dialog';

export const AlertUserRequest: React.FC<UserRequestAlertViewProps> = ({ apply, request }) => (
  <Dialog
    actions={[{ label: request.payload.applyText ?? 'OK', onPress: apply, tone: 'primary' }]}
    description={request.payload.description}
    title={request.payload.title}
  />
);

export const ConfirmUserRequest: React.FC<UserRequestConfirmViewProps> = ({ apply, cancel, request }) => (
  <Dialog
    actions={[
      { label: request.payload.cancelText ?? 'Cancel', onPress: cancel },
      { label: request.payload.applyText ?? 'Confirm', onPress: apply, tone: 'primary' },
    ]}
    description={request.payload.description}
    title={request.payload.title}
  />
);

export const PromptUserRequest: React.FC<UserRequestPromptViewProps> = ({ apply, cancel, request }) => {
  const input = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState(request.payload.defaultValue ?? '');

  useScreenAutoFocus(input);

  return (
    <Dialog
      actions={[
        { label: request.payload.cancelText ?? 'Cancel', onPress: cancel },
        { label: request.payload.applyText ?? 'Apply', onPress: () => apply(value), tone: 'primary' },
      ]}
      description={request.payload.description}
      title={request.payload.title}
    >
      <TextInput
        onChangeText={setValue}
        placeholder={request.payload.placeholder}
        placeholderTextColor="#747987"
        ref={input}
        style={styles.input}
        value={value}
      />
    </Dialog>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#11131a',
    borderColor: '#3a4050',
    borderRadius: 12,
    borderWidth: 1,
    color: '#f7f7fb',
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14,
  },
});
