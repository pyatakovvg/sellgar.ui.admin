import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import {
  FloatingOverlay,
  useFloating,
  useRole,
  useDismiss,
  useClick,
  useId,
  useInteractions,
} from '@floating-ui/react';

import { Window } from './Window';

import { dialogStore } from './dialog.store.ts';

import s from './default.module.scss';

interface IDialogProps {
  isOpen: boolean;
  onClose: (id: string) => void;
}

export const Dialog: React.FC<React.PropsWithChildren<IDialogProps>> = observer((props) => {
  const [isRerender, setRerender] = React.useState(false);

  const headingId = useId();
  const descriptionId = useId();

  const { refs, context } = useFloating({
    open: props.isOpen,
    onOpenChange: (open, event, reason) => {
      console.log(123132, headingId, open, event, reason);
      dialogStore.removeDialog(headingId);
      props.onClose(headingId);
    },
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'click' });

  React.useLayoutEffect(() => {
    if (props.isOpen) {
      dialogStore.addDialog(headingId);
    }
    setTimeout(() => setRerender(!isRerender), 10);
    return () => {
      dialogStore.removeDialog(headingId);
    };
  }, [props.isOpen]);

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  if (!document.querySelector('#dialogPortal')) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={s.overlay}>
      <Window
        ref={refs.setReference}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        {...getFloatingProps()}
        onClose={() => {
          // dialogStore.removeDialog(headingId);
          // props.onClose(headingId);
        }}
      >
        {props.children}
      </Window>
    </div>,
    document.querySelector('#dialogPortal')!,
  );
});
