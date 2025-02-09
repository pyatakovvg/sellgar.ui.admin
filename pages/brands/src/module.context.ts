import React from 'react';

import { BrandsController } from './classes/controller/brands.controller.ts';

interface IContext {
  controller: BrandsController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
