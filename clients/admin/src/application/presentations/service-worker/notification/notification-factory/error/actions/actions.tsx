import React from 'react';
import { Button } from '@sellgar/kit';

import { useNotification } from '../../../hooks/use-notification.hook.ts';
import s from './default.module.scss';

export const ErrorActions: React.FC = () => {
  const notification = useNotification();

  return (
    <div className={s.wrapper}>
      <Button size="xs" style="secondary" onClick={notification.remindLater}>
        Напомнить через 15 минут
      </Button>
      <Button size="xs" target="info" onClick={() => void notification.update()}>
        Повторить
      </Button>
    </div>
  );
};
