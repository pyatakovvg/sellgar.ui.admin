import React from 'react';

import { SignInPresenter } from './classes/presenter/sign-in.presenter.ts';

interface IContext {
  presenter: SignInPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
