import { Typography } from '@sellgar/kit';
import { useException } from '@tiyn/app';

import React from 'react';

import s from './exception.module.scss';

export const Exception: React.FC = () => {
  const error = useException();
  const message = error instanceof Error ? error.message : 'Не удалось открыть форму товара витрины.';

  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <p>{message}</p>
      </Typography>
    </div>
  );
};
