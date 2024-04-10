import React from 'react';

import { ApplicationController } from './application/controller/application.controller.ts';

export interface IApplicationContext {
  controller: ApplicationController;
}

export const context = React.createContext<IApplicationContext>({} as IApplicationContext);
export const Provider = context.Provider;
