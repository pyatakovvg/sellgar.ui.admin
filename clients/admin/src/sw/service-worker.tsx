import { Button, Notification } from '@sellgar/kit';

import React from 'react';
import ReactDOM from 'react-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';

import s from './default.module.scss';

const MINUTE = 60 * 1000;
const UPDATE_CHECK_INTERVAL = 5 * MINUTE;
const SERVICE_WORKER_ACTIVATION_TIMEOUT = 15 * 1000;

type UpdateStatus = 'idle' | 'updating' | 'error';

export const activateWaitingServiceWorker = (
  waitingWorker: ServiceWorker,
  requestActivation: () => Promise<void>,
  reloadPage: () => void,
  activationTimeout = SERVICE_WORKER_ACTIVATION_TIMEOUT,
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    let timeout: number | undefined;
    let settled = false;

    const cleanup = () => {
      waitingWorker.removeEventListener('statechange', handleStateChange);

      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
    };
    const settle = (callback: () => void) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      callback();
    };
    const handleStateChange = () => {
      if (waitingWorker.state === 'activated') {
        settle(resolve);
      } else if (waitingWorker.state === 'redundant') {
        settle(() => reject(new Error('Новый Service Worker перешёл в состояние redundant.')));
      }
    };

    waitingWorker.addEventListener('statechange', handleStateChange);
    timeout = window.setTimeout(() => {
      settle(() => reject(new Error('Превышено время ожидания активации Service Worker.')));
    }, activationTimeout);
    handleStateChange();

    if (!settled) {
      void requestActivation().catch((error: unknown) => settle(() => reject(error)));
    }
  }).then(reloadPage);
};

export const RegisterAndUpdateServiceWorker = () => {
  const [registration, setRegistration] = React.useState<ServiceWorkerRegistration>();
  const [updateStatus, setUpdateStatus] = React.useState<UpdateStatus>('idle');
  const lastUpdateCheckAt = React.useRef(Date.now());
  const isReloading = React.useRef(false);

  const reloadPage = React.useCallback(() => {
    if (isReloading.current) {
      return;
    }

    isReloading.current = true;
    window.location.reload();
  }, []);

  const {
    offlineReady: [isOfflineReady, setOfflineReady],
    needRefresh: [isNeedRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onNeedReload: reloadPage,
    onRegisteredSW(swUrl, serviceWorkerRegistration) {
      console.log(`SW: Service Worker at: ${swUrl}`);
      setRegistration(serviceWorkerRegistration);
    },
    onRegisterError(error) {
      console.log('SW: Registration error', error);
    },
  });

  const checkForUpdate = React.useCallback(async () => {
    if (!registration || !navigator.onLine) {
      return;
    }

    const now = Date.now();

    if (now - lastUpdateCheckAt.current < UPDATE_CHECK_INTERVAL) {
      return;
    }

    lastUpdateCheckAt.current = now;
    console.log('SW: Checking for sw update');

    try {
      await registration.update();
    } catch (error) {
      console.log('SW: Update check error', error);
    }
  }, [registration]);

  React.useEffect(() => {
    if (!registration) {
      return;
    }

    const checkWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        void checkForUpdate();
      }
    };
    const checkWhenOnline = () => void checkForUpdate();
    const interval = window.setInterval(() => void checkForUpdate(), UPDATE_CHECK_INTERVAL);

    document.addEventListener('visibilitychange', checkWhenVisible);
    window.addEventListener('online', checkWhenOnline);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', checkWhenVisible);
      window.removeEventListener('online', checkWhenOnline);
    };
  }, [checkForUpdate, registration]);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setUpdateStatus('idle');
  };

  const update = async () => {
    if (updateStatus === 'updating') {
      return;
    }

    setUpdateStatus('updating');

    try {
      const currentRegistration = registration ?? (await navigator.serviceWorker.getRegistration());
      const waitingWorker = currentRegistration?.waiting;

      if (!waitingWorker) {
        throw new Error('Ожидающий Service Worker не найден.');
      }

      await activateWaitingServiceWorker(waitingWorker, () => updateServiceWorker(false), reloadPage);
    } catch (error) {
      console.log('SW: Activation error', error);
      setUpdateStatus('error');
    }
  };

  React.useEffect(() => {
    isOfflineReady && console.log('SW: Offline ready');
  }, [isOfflineReady]);

  if (!isNeedRefresh) {
    return null;
  }

  const isUpdating = updateStatus === 'updating';
  const isUpdateError = updateStatus === 'error';

  return ReactDOM.createPortal(
    <Notification.Default
      onClose={isUpdating ? undefined : close}
      status={isUpdateError ? 'destructive' : 'info'}
      title={
        isUpdating
          ? 'Обновляем приложение'
          : isUpdateError
            ? 'Не удалось обновить приложение'
            : 'Доступно обновление приложения'
      }
      description={
        isUpdating
          ? 'Обычно это занимает не более 15 секунд.'
          : isUpdateError
            ? 'Проверьте подключение к сети и попробуйте ещё раз.'
            : undefined
      }
      slot={
        <div className={s.controls}>
          <div className={s.button}>
            <Button
              size={'xs'}
              target={'info'}
              disabled={isUpdating}
              inProcess={isUpdating}
              onClick={(event) => {
                event.preventDefault();
                void update();
              }}
            >
              {isUpdating ? 'Обновляем…' : isUpdateError ? 'Повторить' : 'Обновить сейчас'}
            </Button>
          </div>
          <div className={s.button}>
            <Button
              size={'xs'}
              style={'secondary'}
              disabled={isUpdating}
              onClick={(event) => {
                event.preventDefault();
                close();
              }}
            >
              Напомнить позже
            </Button>
          </div>
        </div>
      }
    />,
    document.querySelector('#sw')!,
  );
};
