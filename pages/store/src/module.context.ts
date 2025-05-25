import React from 'react';

import { StoreControllerInterface } from './classes/controller/store-controller.interface.ts';

interface IContext {
  controller: StoreControllerInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
