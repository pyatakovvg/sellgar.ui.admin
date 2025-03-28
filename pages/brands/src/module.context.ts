import React from 'react';

import { BrandsControllerInterface } from './classes/controller/brand-controller.interface.ts';

interface IContext {
  controller: BrandsControllerInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
