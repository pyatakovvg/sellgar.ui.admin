import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Logotype: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>
        <Typography size={'h6'} weight={'bold'}>
          <p>SELLGAR</p>
        </Typography>
      </div>
    </div>
  );
};
