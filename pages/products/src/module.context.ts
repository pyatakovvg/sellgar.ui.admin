import React from 'react';

import { ProductsControllerInterface } from './classes/controller/products-controller.interface.ts';

interface IContext {
  controller: ProductsControllerInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
