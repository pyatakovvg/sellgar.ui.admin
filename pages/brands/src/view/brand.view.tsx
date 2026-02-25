import { BrandDrawer } from '@drawer/brand-modify';
import { StickyLayout } from '@library/design';

import React from 'react';

import { Header } from './header';
import { Filter } from './filter';
import { Content } from './content';

import s from './default.module.scss';

export const BrandView = () => {
  return (
    <>
      <StickyLayout className={s.wrapper}>
        <StickyLayout.Sticky direction={['left']} autoOffset zIndex={10}>
          <Header />
        </StickyLayout.Sticky>
        <StickyLayout.Sticky autoOffset direction={['top', 'left']} zIndex={10}>
          <Filter />
        </StickyLayout.Sticky>
        <StickyLayout.Static zIndex={0}>
          <Content />
        </StickyLayout.Static>
      </StickyLayout>

      <BrandDrawer />
    </>
  );
};
