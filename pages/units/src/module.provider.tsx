import React from 'react';

import { Provider } from './module.context.ts';
import { UnitsController } from './classes/controller/units.controller.ts';

interface IProps {
  controller: UnitsController;
}

export const ModuleProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <Provider
      value={{
        controller: props.controller,
      }}
    >
      {props.children}
    </Provider>
  );
};
