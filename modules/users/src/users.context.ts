import React from 'react';

import { UserPresenter } from './classes/presenter/user.presenter.ts';

interface IContext {
  presenter: UserPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
