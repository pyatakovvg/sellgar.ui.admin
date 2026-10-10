import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Empty: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'}>
        <p>Нет свойств. Добавьте свойство</p>
      </Typography>
    </div>
  );
};
