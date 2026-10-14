import { Spinner } from '@sellgar/kit';

import React from 'react';

import s from './fallback.module.scss';

export const Fallback: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Spinner />
    </div>
  );
};
