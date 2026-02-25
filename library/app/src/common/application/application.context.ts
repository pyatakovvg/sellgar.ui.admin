import React from 'react';

import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

interface IContext {
  controller: ApplicationControllerInterface;
}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
