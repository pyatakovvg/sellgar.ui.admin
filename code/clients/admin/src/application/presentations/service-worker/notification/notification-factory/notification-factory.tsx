import React from 'react';

import { AvailableNotification } from './available';
import { UpdatingNotification } from './updating';
import { ErrorNotification } from './error';
import { CurrentNotification } from './current';
import { UpdatedNotification } from './updated';

import { useNotification } from '../hooks/use-notification.hook.ts';

export const NotificationFactory: React.FC = () => {
  const notification = useNotification();

  switch (notification.status) {
    case 'available':
      return <AvailableNotification />;
    case 'updating':
      return <UpdatingNotification />;
    case 'error':
      return <ErrorNotification />;
    case 'current':
      return <CurrentNotification />;
    case 'updated':
      return <UpdatedNotification />;
  }
};
