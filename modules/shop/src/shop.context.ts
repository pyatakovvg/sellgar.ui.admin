import React from 'react';

import { ShopController } from './shop.controller.ts';

interface IContext {
  controller: ShopController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
