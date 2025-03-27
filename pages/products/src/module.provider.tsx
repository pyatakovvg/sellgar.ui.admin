import React from 'react';

import { Provider } from './module.context.ts';
import { ProductsController } from './classes/controller/products.controller.ts';

interface IProps {
  controller: ProductsController;
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
