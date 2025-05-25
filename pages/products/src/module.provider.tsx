import React from 'react';

import { Provider } from './module.context.ts';
import { ProductsControllerInterface } from './classes/controller/products-controller.interface.ts';

interface IProps {
  controller: ProductsControllerInterface;
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
