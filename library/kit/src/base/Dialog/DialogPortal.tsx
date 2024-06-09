import React from 'react';
import { FloatingPortal, FloatingOverlay } from '@floating-ui/react';

import { Dialog } from './Dialog';
import s from '@/base/Dialog/default.module.scss';

interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DialogPortal: React.FC<React.PropsWithChildren<IDialogProps>> = () => {
  return (
    <FloatingPortal root={document.body.querySelector('#dialog') as HTMLElement}>
      <FloatingOverlay lockScroll className={s.wrapper}>
        <Dialog isOpen={true} onClose={() => {}} />
      </FloatingOverlay>
    </FloatingPortal>
  );
};
