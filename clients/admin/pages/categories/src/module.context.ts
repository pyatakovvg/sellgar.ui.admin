import React from 'react';

import { CategoryPresenter } from './classes/presenter/category.presenter.ts';

interface IContext {
  presenter: CategoryPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
