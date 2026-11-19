import React from 'react';

import { Typography } from '@sellgar/kit';

import s from './default.module.css';

export const Missing: React.FC = () => {
  return (
    <div className={s.wrapper} role="status">
      <Typography size="body-m" weight="semi-bold">
        <p className={s.title}>Корзина не найдена</p>
      </Typography>
      <p className={s.message}>Возможно, корзина уже удалена. Закройте просмотр и обновите список.</p>
    </div>
  );
};
