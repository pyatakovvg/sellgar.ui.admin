import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Title: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'semi-bold'}>
        <p>Варианты товара</p>
      </Typography>
    </div>
  );
};
