import React from 'react';
import { Button } from '@sellgar/kit';

import s from './default.module.scss';

export const UpdatingActions: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Button size="xs" style="secondary" disabled={true}>
        Напомнить через 15 минут
      </Button>
      <Button size="xs" target="info" disabled={true} inProcess={true}>
        Обновляем…
      </Button>
    </div>
  );
};
