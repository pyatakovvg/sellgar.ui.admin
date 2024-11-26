import { Heading } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const NotPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.description}>
          <Heading variant={'H2'}>Страница не найдена</Heading>
        </div>
      </div>
    </div>
  );
};
