import React from 'react';

import { Provider } from './module.context.ts';
import { PropertyPresenter } from './classes/presenter/property.presenter.ts';

interface IProps {
  controller: PropertyPresenter;
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
