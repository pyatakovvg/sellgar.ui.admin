import React from 'react';

import { Header } from './header';
import { Fields } from './fields';

import s from './default.module.scss';

export const Product: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.content}>
        <Fields />
      </div>
    </div>
  );
};
