import React from 'react';

import { ApplicationController } from './application/application.controller.ts';

export interface IApplicationContext {
  appController: ApplicationController;
}

export const context = React.createContext<IApplicationContext>({} as IApplicationContext);
export const Provider = context.Provider;
