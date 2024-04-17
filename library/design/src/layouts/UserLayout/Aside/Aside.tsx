import React from 'react';

import { Menu } from './Menu';

import s from './default.module.scss';

export const Aside: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Menu />
    </div>
  );
};
