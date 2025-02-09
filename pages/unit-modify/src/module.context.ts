import React from 'react';

import { UnitPresenter } from './classes/presenter/unit.presenter.ts';

interface IContext {
  presenter: UnitPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
