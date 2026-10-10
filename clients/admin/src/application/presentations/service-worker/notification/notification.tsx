import React from 'react';
import type { ServiceWorkerNotificationProps } from '@feature/service-worker';

import { NOTIFICATION_CONTEXT } from './context/notification.context.ts';
import { NotificationFactory } from './notification-factory';
import s from './default.module.scss';

interface IProps extends ServiceWorkerNotificationProps {}

export const ServiceWorkerNotificationView: React.FC<IProps> = (props) => {
  return (
    <NOTIFICATION_CONTEXT value={props}>
      <div className={s.wrapper}>
        <NotificationFactory />
      </div>
    </NOTIFICATION_CONTEXT>
  );
};
