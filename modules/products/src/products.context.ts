import React from 'react';
import { ProductsController } from './products.controller.ts';

interface IContext {
  controller: ProductsController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
