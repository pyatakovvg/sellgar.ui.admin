import React from 'react';

import { Provider } from './module.context.ts';
import { ProductControllerInterface } from './classes/controller/product-controller.interface.ts';

interface IProps {
  controller: ProductControllerInterface;
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
