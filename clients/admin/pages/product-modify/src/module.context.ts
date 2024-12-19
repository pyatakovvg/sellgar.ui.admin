import React from 'react';

import { ProductPresenterInterface } from './classes/presenter/product-presenter.interface.ts';

interface IContext {
  presenter: ProductPresenterInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
