import React from 'react';
import { DashboardController } from './dashboard.controller.ts';

interface IContext {
  controller: DashboardController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
