import React from 'react';

import { BrandPresenter } from './classes/presenter/brand.presenter.ts';

interface IContext {
  presenter: BrandPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
