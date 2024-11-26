import React from 'react';

import { PushService } from './classes/services/push.service.ts';

interface IContext {
  service: PushService;
}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
