import React from 'react';

import { BrandControllerInterface } from './classes/controller/brand-controller.interface.ts';

interface IContext {
  presenter: BrandControllerInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
