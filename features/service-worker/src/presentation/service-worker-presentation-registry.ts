import type React from 'react';

import type { ServiceWorkerNotificationProps } from './service-worker-notification-props.ts';

export class ServiceWorkerPresentationRegistry {
  private notificationView?: React.ComponentType<ServiceWorkerNotificationProps>;

  notification(view: React.ComponentType<ServiceWorkerNotificationProps>): void {
    this.notificationView = view;
  }

  getNotification(): React.ComponentType<ServiceWorkerNotificationProps> {
    if (!this.notificationView) {
      throw new Error('Не настроено представление уведомления Service Worker.');
    }

    return this.notificationView;
  }
}
