import React from 'react';

import { Provider } from './module.context.ts';
import { container } from './classes/classes.di.ts';
import { ProductsController, ProductsControllerSymbol } from './classes/controller/products.controller.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        controller: container.get<ProductsController>(ProductsControllerSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
