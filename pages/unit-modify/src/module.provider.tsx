import React from 'react';

import { Provider } from './module.context.ts';
import { UnitControllerInterface } from './classes/controller/unit-controller.interface.ts';

interface IProps {
  controller: UnitControllerInterface;
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
