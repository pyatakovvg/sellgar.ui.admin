import React from 'react';

import { PermissionPresenter } from './classes/presenter/permission.presenter.ts';

interface IContext {
  presenter: PermissionPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
