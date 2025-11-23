import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const NotFound = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'h3'}>
          <p>Страница не найдена</p>
        </Typography>
      </div>
    </div>
  );
};
