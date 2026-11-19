import React from 'react';

import { Drawer, Typography } from '@sellgar/kit';

import s from './default.module.css';

export const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size="body-m" weight="medium">
        <h2 className={s.title}>Корзина</h2>
      </Typography>
      <Drawer.Close aria-label="Закрыть просмотр корзины" />
    </div>
  );
};
