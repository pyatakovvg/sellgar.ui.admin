import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.css';

export const Title: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'h6'} weight={'semi-bold'}>
        <h2>Категории</h2>
      </Typography>
      <Typography size={'caption-m'} weight={'medium'}>
        <p>Дерево категорий магазина</p>
      </Typography>
    </div>
  );
};
