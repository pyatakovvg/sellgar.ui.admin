import React from 'react';

import { Provider } from './module.context.ts';
import { container } from './classes/classes.di.ts';
import { PropertyController, PropertyControllerSymbol } from './classes/controller/property.controller.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        controller: container.get<PropertyController>(PropertyControllerSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
