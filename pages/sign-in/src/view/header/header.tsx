import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'h6'} weight={'semi-bold'}>
        <h1>Авторизация</h1>
      </Typography>
    </div>
  );
};
