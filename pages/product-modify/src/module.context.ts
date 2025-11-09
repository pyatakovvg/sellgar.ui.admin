import React from 'react';

import { ProductControllerInterface } from './classes/controller/product-controller.interface.ts';

interface IContext {
  controller: ProductControllerInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
