import React from 'react';

import { Proxy } from './Proxy';
import { Header } from './Header';

import s from './default.module.scss';

export const Products = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.content}>
        <Proxy />
      </div>
    </div>
  );
};
