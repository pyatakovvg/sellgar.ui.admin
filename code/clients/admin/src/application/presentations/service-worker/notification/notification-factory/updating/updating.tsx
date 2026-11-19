import React from 'react';
import { Notification } from '@sellgar/kit';

export const UpdatingNotification: React.FC = () => {
  return (
    <Notification.Default
      status="info"
      title="Обновляем приложение"
      description="Ожидаем активацию новой версии. Обычно это занимает несколько секунд."
    />
  );
};
