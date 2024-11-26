import React from 'react';

import { FilesPresenter } from './classes/presenter/files.presenter.ts';

interface IContext {
  presenter: FilesPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
