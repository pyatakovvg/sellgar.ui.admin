import React from 'react';

import { Provider } from './module.context.ts';
import { StoreControllerInterface } from './classes/controller/store-controller.interface.ts';

interface IProps {
  controller: StoreControllerInterface;
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
