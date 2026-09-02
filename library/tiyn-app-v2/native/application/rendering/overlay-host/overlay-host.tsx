import React from 'react';

import { KeyboardSurface } from '../../../keyboard/rendering/keyboard-surface';

interface OverlayHostProps {
  readonly children: React.ReactNode;
  readonly frame: React.ReactNode;
  readonly modal: React.ReactNode;
  readonly notification: React.ReactNode;
}

export const OverlayHost: React.FC<OverlayHostProps> = (props) => {
  return (
    <>
      <KeyboardSurface>
        {props.children}
        {props.frame}
      </KeyboardSurface>
      {props.modal}
      {props.notification}
    </>
  );
};
