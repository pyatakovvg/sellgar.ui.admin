import React from 'react';

import { Provider } from './module.context.ts';
import { FilesPresenter } from './classes/presenter/files.presenter.ts';

interface IProps {
  controller: FilesPresenter;
}

export const ModuleProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <Provider
      value={{
        presenter: props.controller,
      }}
    >
      {props.children}
    </Provider>
  );
};
