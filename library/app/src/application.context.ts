import React from 'react';

import { ApplicationPresenter } from './classes/presenters/application.presenter.ts';

export interface IApplicationContext {
  presenter: ApplicationPresenter;
}

export const context = React.createContext<IApplicationContext>({} as IApplicationContext);
export const Provider = context.Provider;
