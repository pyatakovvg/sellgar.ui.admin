import React from 'react';
import { observer } from 'mobx-react';
import { FloatingPortal, FloatingOverlay } from '@floating-ui/react';

import s from './default.module.scss';

import { dialogStore } from './dialog.store.ts';

export const DialogProvider = observer(() => {
  if (!dialogStore.isOpen) {
    return null;
  }

  return (
    <FloatingPortal root={document.body.querySelector('#dialog') as HTMLElement}>
      <FloatingOverlay id={'dialogPortal'} lockScroll className={s.wrapper} />
    </FloatingPortal>
  );
});
