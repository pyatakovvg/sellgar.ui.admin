import { Button, Notification } from '@sellgar/kit';

import React from 'react';
import ReactDOM from 'react-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';

import s from './default.module.scss';

export const RegisterAndUpdateServiceWorker = () => {
  const {
    offlineReady: [isOfflineReady, setOfflineReady],
    needRefresh: [isNeedRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log(`SW: Service Worker at: ${swUrl}`);
      r &&
        setInterval(() => {
          console.log('SW: Checking for sw update');
          r.update();
        }, 20000 /* 20s for testing purposes */);
    },
    onRegisterError(error) {
      console.log('SW: Registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const update = async () => {
    await updateServiceWorker();
    setTimeout(() => window.location.reload(), 500);
  };

  React.useEffect(() => {
    isOfflineReady && console.log('SW: Offline ready');
  }, [isOfflineReady]);

  if (!isNeedRefresh) {
    return null;
  }

  return ReactDOM.createPortal(
    <Notification
      onClose={close}
      style={'info'}
      title={'Доступно обновление приложения'}
      slot={
        <div className={s.controls}>
          <div className={s.button}>
            <Button size={'xs'} style={'secondary'} onClick={close}>
              Напомнить позже
            </Button>
          </div>
          <div className={s.button}>
            <Button size={'xs'} target={'info'} onClick={update}>
              Обновить сейчас
            </Button>
          </div>
        </div>
      }
    />,
    document.getElementById('sw')!,
  );
};
