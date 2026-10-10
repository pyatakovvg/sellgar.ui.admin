import React from 'react';
import type { ServiceWorkerNotificationProps } from '@feature/service-worker';

export const NOTIFICATION_CONTEXT = React.createContext<ServiceWorkerNotificationProps | undefined>(undefined);
