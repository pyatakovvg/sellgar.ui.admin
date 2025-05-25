import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const NotFound = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.description}>
          <Typography size={'h6'} weight={'semi-bold'}>
            <p>Страница не найдена</p>
          </Typography>
        </div>
      </div>
    </div>
  );
};
