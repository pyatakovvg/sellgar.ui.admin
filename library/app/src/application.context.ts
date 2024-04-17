import React from 'react';

import { ProfilePresenter } from './classes/presenter/profile.presenter.ts';
import { ApplicationPresenter } from './classes/presenter/application.presenter.ts';

export interface IApplicationContext {
  profile: ProfilePresenter;
  presenter: ApplicationPresenter;
}

export const context = React.createContext<IApplicationContext>({} as IApplicationContext);
export const Provider = context.Provider;
