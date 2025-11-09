import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './empty.module.scss';

export const Empty = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'}>
        <p>Нет свойств. Добавьте свойство</p>
      </Typography>
    </div>
  );
};
