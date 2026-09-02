import React from 'react';
import type { ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView, type KeyboardAwareScrollViewRef } from 'react-native-keyboard-controller';

import { resolveKeyboardScrollProps } from '../../scroll/keyboard-scroll-props';

export interface KeyboardScrollViewProps extends ScrollViewProps {
  readonly bottomOffset?: number;
}

export type KeyboardScrollViewRef = KeyboardAwareScrollViewRef;

export const KeyboardScrollView = React.forwardRef<KeyboardScrollViewRef, KeyboardScrollViewProps>((props, ref) => {
  const { bottomOffset = 16, ...scrollProps } = props;
  const keyboardScrollProps = resolveKeyboardScrollProps(scrollProps);

  return (
    <KeyboardAwareScrollView
      {...scrollProps}
      {...keyboardScrollProps}
      bottomOffset={bottomOffset}
      disableScrollOnKeyboardHide
      mode="layout"
      ref={ref}
    />
  );
});

KeyboardScrollView.displayName = 'KeyboardScrollView';
