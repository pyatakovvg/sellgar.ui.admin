import React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export const KeyboardSurface: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <KeyboardProvider preload={false} preserveEdgeToEdge>
      {props.children}
    </KeyboardProvider>
  );
};
