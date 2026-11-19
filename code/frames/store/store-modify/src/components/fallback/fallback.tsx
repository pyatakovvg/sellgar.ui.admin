import { Spinner } from '@sellgar/kit';

import React from 'react';

import s from './fallback.module.css';

export const Fallback: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Spinner />
    </div>
  );
};
