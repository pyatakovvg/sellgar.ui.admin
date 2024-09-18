import React from 'react';

import { ShopPresenter } from './classes/presenter/shop.presenter.ts';

interface IContext {
  presenter: ShopPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
