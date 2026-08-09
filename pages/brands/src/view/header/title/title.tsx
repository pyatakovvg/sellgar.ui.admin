import { Typography } from '@sellgar/kit';
import { CopyrightLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import s from './default.module.scss';

export const Title: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.icon}>
        <CopyrightLineIcon />
      </div>
      <Typography size={'h6'} weight={'semi-bold'}>
        <h2>Бренды</h2>
      </Typography>
    </div>
  );
};
