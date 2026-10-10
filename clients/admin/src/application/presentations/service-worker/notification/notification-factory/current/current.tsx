import React from 'react';
import { Button, Notification } from '@sellgar/kit';

import { useNotification } from '../../hooks/use-notification.hook.ts';
import s from './default.module.scss';

export const CurrentNotification: React.FC = () => {
  const notification = useNotification();

  return (
    <Notification.Default
      onClose={notification.close}
      status="success"
      title="Обновление уже применено"
      description="Активный Service Worker уже контролирует текущую вкладку."
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
