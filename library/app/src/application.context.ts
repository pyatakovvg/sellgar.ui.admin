import React from 'react';

import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

export interface IApplicationContext {
  controller: ApplicationControllerInterface;
}

export const context = React.createContext<IApplicationContext>({} as IApplicationContext);
export const Provider = context.Provider;
