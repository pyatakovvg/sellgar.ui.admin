import { Typography, Drawer } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {}

export const Header: React.FC<IProps> = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'body-l'}>
        <p>Бренд товара</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
