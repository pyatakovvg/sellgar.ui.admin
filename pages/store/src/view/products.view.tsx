import React from 'react';

import { Header } from './header';
import { Filter } from './filter';
import { Content } from './content';

import s from './default.module.scss';

export const ProductsView = () => {
  return (
    <div className={s.wrapper}>
      <Header />
      <Filter />
      <Content />
    </div>
  );
};
