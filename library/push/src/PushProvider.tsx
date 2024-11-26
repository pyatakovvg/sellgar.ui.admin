import React from 'react';

import { Provider } from './push.context.ts';

import { container } from './classes/classes.di.ts';
import { PushService, PushServiceSymbol } from './classes/services/push.service.ts';

export const PushProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [service] = React.useState(() => container.get<PushService>(PushServiceSymbol));

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
  }, []);

  return <Provider value={{ service }}>{props.children}</Provider>;
};
