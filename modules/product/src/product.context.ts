import React from 'react';
import { ProductController } from './product.controller.ts';

interface IContext {
  controller: ProductController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
