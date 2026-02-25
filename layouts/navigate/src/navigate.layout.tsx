import React from 'react';

import { Mobile } from './mobile';
import { Desktop } from './desktop';
import { LayoutSlot, LayoutSlotProvider } from './layout-slot';

import { useScreenSize } from './screen-size.hook.ts';

import s from './default.module.scss';

const NavigateLayoutComponent: React.FC<React.PropsWithChildren> = (props) => {
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  return (
    <LayoutSlotProvider>
      <div className={s.wrapper}>
        {isDesktop ? (
          <Desktop>{props.children}</Desktop>
        ) : isTablet ? (
          <Desktop>{props.children}</Desktop>
        ) : (
          isMobile && <Mobile>{props.children}</Mobile>
        )}
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
