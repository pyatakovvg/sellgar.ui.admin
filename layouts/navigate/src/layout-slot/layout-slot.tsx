import { Sidebar } from '@sellgar/kit';

import React from 'react';
import ReactDOM from 'react-dom';

import { layoutSlotContext } from './layout-slot.context.ts';

import s from './default.module.scss';

export const LayoutSlot: React.FC<React.PropsWithChildren> = (props) => {
  const context = React.useContext(layoutSlotContext);

  if (!context || !context.node) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={s.wrapper}>{props.children}</div>
      <Sidebar.Divider />
    </>,
    context.node,
  );
};
