import React from 'react';
import {
  FloatingOverlay,
  FloatingFocusManager,
  useFloating,
  useRole,
  useDismiss,
  useClick,
  useId,
  useInteractions,
} from '@floating-ui/react';

import { Window } from './Window';

import s from './default.module.scss';

interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Dialog: React.FC<React.PropsWithChildren<IDialogProps>> = (props) => {
  const { refs, context } = useFloating({
    open: props.isOpen,
    onOpenChange: props.onClose,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'click' });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  return (
    <Window
      ref={refs.setFloating}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      {...getFloatingProps()}
      onClose={() => {
        props.onClose();
      }}
    >
      {props.children}
    </Window>
  );
};
