import React from 'react';
import { FloatingPortal, FloatingOverlay } from '@floating-ui/react';

import { Window } from './Window';
import { Header } from './Header';

import s from './default.module.scss';

interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDialog: React.FC<React.PropsWithChildren<IDialogProps>> = (props) => {
  const handleClose = React.useCallback(() => {
    props.onClose();
  }, [props]);

  if (!props.isOpen) {
    return null;
  }

  return (
    <FloatingPortal root={document.body.querySelector('#dialog') as HTMLElement}>
      <FloatingOverlay lockScroll={true} className={s.wrapper} onClick={handleClose}>
        <Window>{props.children}</Window>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

export const Dialog = Object.assign(ModalDialog, {
  Header,
});
