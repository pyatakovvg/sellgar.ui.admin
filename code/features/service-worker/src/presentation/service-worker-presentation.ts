import type React from 'react';

import type { ServiceWorkerNotificationProps } from './service-worker-notification-props.ts';
import { ServiceWorkerPresentationRegistry } from './service-worker-presentation-registry.ts';

export class ServiceWorkerPresentation {
  private constructor(private readonly notificationView: React.ComponentType<ServiceWorkerNotificationProps>) {}

  static define(definition: (registry: ServiceWorkerPresentationRegistry) => void): ServiceWorkerPresentation {
    const registry = new ServiceWorkerPresentationRegistry();

    definition(registry);

    return new ServiceWorkerPresentation(registry.getNotification());
  }

  resolve(): React.ComponentType<ServiceWorkerNotificationProps> {
    return this.notificationView;
  }
}
