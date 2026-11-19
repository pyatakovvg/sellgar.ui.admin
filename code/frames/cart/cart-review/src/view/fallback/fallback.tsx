import React from 'react';

import { Spinner } from '@sellgar/kit';

import s from './default.module.css';

export const Fallback: React.FC = () => {
  return (
    <div className={s.wrapper} role="status">
      <Spinner />
      <p className={s.message}>Загрузка корзины…</p>
    </div>
  );
};
