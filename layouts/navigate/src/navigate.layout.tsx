import { Scrollbar } from '@sellgar/kit';

import React from 'react';

import { Aside } from './aside';
import { LayoutSlot, LayoutSlotProvider } from './layout-slot';

import s from './default.module.scss';

const NavigateLayoutComponent: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <LayoutSlotProvider>
      <div className={s.wrapper}>
        <Aside />
        <Scrollbar className={s.content}>{props.children}</Scrollbar>
      </div>
    </LayoutSlotProvider>
  );
};

type TNavigateLayout = typeof NavigateLayoutComponent & {
  Slot: typeof LayoutSlot;
};

export const NavigateLayout: TNavigateLayout = Object.assign(NavigateLayoutComponent, {
  Slot: LayoutSlot,
});
