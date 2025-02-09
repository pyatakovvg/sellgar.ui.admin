import React from 'react';

import { PropertyPresenter } from './classes/presenter/property.presenter.ts';

interface IContext {
  presenter: PropertyPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
