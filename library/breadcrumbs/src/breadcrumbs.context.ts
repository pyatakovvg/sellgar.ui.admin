import React from 'react';

import { BreadcrumbPresenter } from './classes/presenters/breadcrumb.presenter.ts';

interface IContext {
  presenter: BreadcrumbPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
