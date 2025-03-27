import React from 'react';

import { Provider } from './module.context.ts';
import { PropertyGroupPresenter } from './classes/presenter/property-group.presenter.ts';

interface IProps {
  controller: PropertyGroupPresenter;
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
