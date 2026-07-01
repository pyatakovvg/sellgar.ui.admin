import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './exception.module.scss';

export const Exception: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'}>
        <p>Не удалось открыть управление остатком.</p>
      </Typography>
    </div>
  );
};
