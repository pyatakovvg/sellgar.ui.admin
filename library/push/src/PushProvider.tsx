import React from 'react';
import { useDependency } from '@tiyn/app';

import { Provider } from './push.context.ts';

import { PushService, PushServiceSymbol } from './classes/services/push.service.ts';

export const PushProvider: React.FC<React.PropsWithChildren> = (props) => {
  const service = useDependency<PushService>(PushServiceSymbol);

  React.useEffect(() => {
    (async () => {
      try {
        await service.register();
        await service.requestNotificationPermission();
        service.subscribe();
      } catch (e) {
        console.log(e);
      }
    })();
  }, [service]);

  return <Provider value={{ service }}>{props.children}</Provider>;
};
