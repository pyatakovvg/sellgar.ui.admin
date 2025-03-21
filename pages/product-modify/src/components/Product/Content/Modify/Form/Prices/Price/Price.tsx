import { Typography } from '@sellgar/kit';

import React from 'react';

import { EditPrice } from '../History/CurrentPrice/EditPrice';

import s from './default.module.scss';

export const Price: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'body-m'} weight={'semi-bold'}>
          <p>Цена</p>
        </Typography>
      </div>
      <div className={s.content}>
        <EditPrice value={0} />
      </div>
    </div>
  );
};
