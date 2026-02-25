import { StickyLayout } from '@sellgar/kit';
import { StoreDrawer } from '@drawer/store-modify';

import React from 'react';

import { Header } from './header';
import { Filter } from './filter';
import { Content } from './content';

import s from './default.module.scss';

export const ProductsView = () => {
  return (
    <StickyLayout className={s.wrapper}>
      <StickyLayout.Sticky direction={['left']} offset={24}>
        <Header />
      </StickyLayout.Sticky>
      <StickyLayout.Sticky direction={['left']} offset={24}>
        <Filter />
      </StickyLayout.Sticky>
      <StickyLayout.Static>
        <Content />
      </StickyLayout.Static>

      <StoreDrawer />
    </StickyLayout>
  );
};
