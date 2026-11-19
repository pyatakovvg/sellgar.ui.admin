import React from 'react';
import { Notification } from '@sellgar/kit';
import type { ServiceWorkerNotificationProps } from '@feature/service-worker';

import { useNotification } from '../../hooks/use-notification.hook.ts';
import { ErrorActions } from './actions';

const getErrorDescription = (code: ServiceWorkerNotificationProps['errorCode']): string => {
  switch (code) {
    case 'activation-timeout':
      return 'Новая версия не завершила активацию за 60 секунд. Закройте другие вкладки приложения и повторите.';
    case 'activation-redundant':
      return 'Браузер заменил ожидавшую версию другой сборкой. Повторите обновление.';
    case 'update-unavailable':
      return 'Состояние обновления изменилось. Повторите попытку — приложение заново проверит активную версию.';
    case 'verification-failed':
      return 'После перезагрузки осталась прежняя сборка. Закройте другие вкладки приложения и повторите.';
    default:
      return 'Браузер не смог активировать новую версию приложения. Повторите обновление.';
  }
};

export const ErrorNotification: React.FC = () => {
  const notification = useNotification();

  return (
    <Notification.Default
      onClose={notification.close}
      status="destructive"
      title="Не удалось подтвердить обновление"
      description={getErrorDescription(notification.errorCode)}
      slot={<ErrorActions />}
    />
  );
};
