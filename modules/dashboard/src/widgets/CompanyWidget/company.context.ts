import React from 'react';
import { CompanyPresenter } from './classes/presenter/company.presenter.ts';

interface IContext {
  presenter: CompanyPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
