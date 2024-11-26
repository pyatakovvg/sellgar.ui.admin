import React from 'react';

import { LngPresenter } from './classes/presenters/lng.presenter.ts';

interface IContext {
  presenter: LngPresenter;
}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
