import { Spinner } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Loading = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Spinner />
      </div>
    </div>
  );
};
