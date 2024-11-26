import React from 'react';

import { Provider } from './module.context.ts';
import { container } from './classes/classes.di.ts';
import { FilesPresenter, FilesPresenterSymbol } from './classes/presenter/files.presenter.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        presenter: container.get<FilesPresenter>(FilesPresenterSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
