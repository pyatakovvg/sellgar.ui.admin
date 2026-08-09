import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Title: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'h6'} weight={'semi-bold'}>
        <h2>Свойства</h2>
      </Typography>
    </div>
  );
};
