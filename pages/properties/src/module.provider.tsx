import React from 'react';

import { Provider } from './module.context.ts';
import { PropertyController } from './classes/controller/property.controller.ts';

interface IProps {
  controller: PropertyController;
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
