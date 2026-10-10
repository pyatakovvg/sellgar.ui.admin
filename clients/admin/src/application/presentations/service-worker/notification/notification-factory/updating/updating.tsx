import React from 'react';
import { Notification } from '@sellgar/kit';
import { UpdatingActions } from './actions';

export const UpdatingNotification: React.FC = () => {
  return (
    <Notification.Default
      status="info"
      title="Обновляем приложение"
      description="Ожидаем активацию новой версии. Обычно это занимает несколько секунд."
      slot={<UpdatingActions />}
    />
  );
};
