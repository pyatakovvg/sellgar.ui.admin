import React from 'react';
import { UserController } from './user.controller.ts';

interface IContext {
  controller: UserController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
