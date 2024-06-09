import React from 'react';

import { ProductPresenter } from '@/classes/presenter/product.presenter.ts';

interface IContext {
  presenter: ProductPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
