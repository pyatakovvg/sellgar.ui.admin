import { useException } from '@sellgar/app-v2/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './exception.module.scss';

export const Exception: React.FC = () => {
  const error = useException();
  const message = error instanceof Error ? error.message : 'Не удалось открыть форму бренда.';

  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <p>{message}</p>
      </Typography>
    </div>
  );
};
