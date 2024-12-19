import React from 'react';

import { Provider } from './module.context.ts';
import { container } from './classes/classes.di.ts';
import { UnitsController, UnitsControllerSymbol } from './classes/controller/units.controller.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        controller: container.get<UnitsController>(UnitsControllerSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
