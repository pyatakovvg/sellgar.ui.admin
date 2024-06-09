import React from 'react';

import { RolePresenter } from './classes/presenter/role.presenter.ts';

interface IContext {
  presenter: RolePresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
