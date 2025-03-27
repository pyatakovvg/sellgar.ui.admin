import React from 'react';

import { Provider } from './module.context.ts';
import { UnitPresenter } from './classes/presenter/unit.presenter.ts';

interface IProps {
  controller: UnitPresenter;
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
