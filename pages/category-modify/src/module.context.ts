import React from 'react';

import { CategoryControllerInterface } from './classes/controller/category-controller.interface.ts';

interface IContext {
  presenter: CategoryControllerInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
