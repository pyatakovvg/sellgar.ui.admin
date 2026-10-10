import React from 'react';
import { Button } from '@sellgar/kit';

import { useNotification } from '../../../hooks/use-notification.hook.ts';
import s from './default.module.scss';

export const AvailableActions: React.FC = () => {
  const notification = useNotification();

  return (
    <div className={s.wrapper}>
      <Button size="xs" target="info" onClick={() => void notification.update()}>
        Обновить сейчас
      </Button>
      <Button size="xs" style="tertiary" onClick={notification.remindLater}>
        Напомнить через 15 минут
      </Button>
    </div>
  );
};
