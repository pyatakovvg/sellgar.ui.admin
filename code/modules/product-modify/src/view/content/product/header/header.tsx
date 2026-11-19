import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.css';

export const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'semi-bold'}>
        <p>Основная информация</p>
      </Typography>
    </div>
  );
};
