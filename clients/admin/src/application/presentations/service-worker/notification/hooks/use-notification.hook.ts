import React from 'react';

import { NOTIFICATION_CONTEXT } from '../context/notification.context.ts';

export const useNotification = () => {
  const notification = React.useContext(NOTIFICATION_CONTEXT);

  if (!notification) {
    throw new Error('Компонент уведомления должен находиться внутри ServiceWorkerNotificationView.');
  }

  return notification;
};
