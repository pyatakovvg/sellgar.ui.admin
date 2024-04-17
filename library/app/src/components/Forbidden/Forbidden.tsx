import { Heading } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Forbidden: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h3'}>Что-то пошло не так!</Heading>
      </div>
      <div className={s.message}>
        <Heading variant={'h4'}>Доступ запрещен</Heading>
      </div>
    </div>
  );
};
