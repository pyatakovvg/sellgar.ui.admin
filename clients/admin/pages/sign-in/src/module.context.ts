import React from 'react';

import { SignInPresenterInterface } from './classes/presenter/sign-in-presenter.interface.ts';

interface IContext {
  presenter: SignInPresenterInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
