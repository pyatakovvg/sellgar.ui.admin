import { Drawer, Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'body-l'}>
        <p className={s.label}>Товар на складе</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
