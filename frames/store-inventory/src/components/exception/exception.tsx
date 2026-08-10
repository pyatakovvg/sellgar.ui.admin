import { useException } from '@sellgar/app';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './exception.module.scss';

export const Exception: React.FC = () => {
  const error = useException();
  const message = error instanceof Error ? error.message : 'Не удалось открыть управление остатком.';

  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'}>
        <p>{message}</p>
      </Typography>
    </div>
  );
};
