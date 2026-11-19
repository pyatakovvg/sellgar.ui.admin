import React from 'react';
import { Notification } from '@sellgar/kit';

import { useNotification } from '../../hooks/use-notification.hook.ts';
import { AvailableActions } from './actions';

export const AvailableNotification: React.FC = () => {
  const notification = useNotification();

  return (
    <Notification.Default
      onClose={notification.close}
      status="info"
      title="Доступно обновление приложения"
      slot={<AvailableActions />}
    />
  );
};
