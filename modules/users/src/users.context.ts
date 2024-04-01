import React from 'react';

import { UsersController } from './users.controller.ts';

interface IContext {
  controller: UsersController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
