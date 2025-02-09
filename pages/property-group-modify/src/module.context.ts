import React from 'react';

import { PropertyGroupPresenter } from './classes/presenter/property-group.presenter.ts';

interface IContext {
  presenter: PropertyGroupPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
