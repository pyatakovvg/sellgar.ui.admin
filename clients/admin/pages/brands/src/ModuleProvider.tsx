import React from 'react';

import { Provider } from './module.context.ts';
import { container } from './classes/classes.di.ts';
import { BrandsController, BrandsControllerSymbol } from './classes/controller/brands.controller.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        controller: container.get<BrandsController>(BrandsControllerSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
