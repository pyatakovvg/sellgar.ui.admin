import React from 'react';
import { Button, Notification } from '@sellgar/kit';

import { useNotification } from '../../hooks/use-notification.hook.ts';
import s from './default.module.scss';

export const UpdatedNotification: React.FC = () => {
  const notification = useNotification();

  return (
    <Notification.Default
      onClose={notification.close}
      status="success"
      title="Приложение обновлено"
      description="Новая сборка загружена и подтверждена."
      slot={
        <div className={s.controls}>
          <Button size="xs" target="info" onClick={notification.close}>
            Закрыть
          </Button>
        </div>
      }
    />
  );
};
