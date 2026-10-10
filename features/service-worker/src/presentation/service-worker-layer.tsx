import React from 'react';
import { observer } from 'mobx-react';
import { useController } from '@sellgar/app/react';

import { UpdateControllerInterface } from '../classes/controller/update/update-controller.interface.ts';
import type { ServiceWorkerPresentation } from './service-worker-presentation.ts';

interface ServiceWorkerLayerProps {
  readonly presentation: ServiceWorkerPresentation;
}

export const ServiceWorkerLayer: React.FC<ServiceWorkerLayerProps> = observer(({ presentation }) => {
  const controller = useController(UpdateControllerInterface);
  const { status, errorCode } = controller;

  if (status === 'idle') return null;

  const NotificationView = presentation.resolve();

  return (
    <NotificationView
      status={status}
      errorCode={errorCode}
      update={() => controller.update()}
      close={() => controller.close()}
      remindLater={() => controller.remindLater()}
    />
  );
});
