import React from 'react';

import { Provider } from './module.context.ts';
import { PropertyControllerInterface } from './classes/controller/property-controller.interface.ts';

interface IProps {
  controller: PropertyControllerInterface;
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
