import { Layout } from '@sellgar/app';
import type { LayoutViewProps } from '@sellgar/app';

import React from 'react';

import { Mobile } from './mobile';
import { Desktop } from './desktop';
import { LayoutSlot, LayoutSlotProvider } from './layout-slot';

import { useScreenSize } from './screen-size.hook.ts';

import s from './default.module.scss';

const NavigateLayoutView: React.FC<LayoutViewProps> = (props) => {
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

@Layout({
  view: NavigateLayoutView,
})
export class NavigateLayout {
  static Slot = LayoutSlot;
}
