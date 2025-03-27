import React from 'react';

import { Header } from './header';
import { Content } from './content';

import s from './default.module.scss';

export const BrandView = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
};
