import React from 'react';

import { FilePresenter } from '@/classes/presenter/file.presenter.ts';

interface IContext {
  presenter: FilePresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
