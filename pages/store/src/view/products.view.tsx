import { StoreDrawer } from '@drawer/store-modify';

import React from 'react';

import { Header } from './header';
import { Filter } from './filter';
import { Content } from './content';

import s from './default.module.scss';

export const ProductsView = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.filter}>
        <Filter />
      </div>
      <div className={s.content}>
        <Content />
      </div>
      <StoreDrawer />
    </div>
  );
};
