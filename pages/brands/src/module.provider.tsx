import React from 'react';

import { Provider } from './module.context.ts';
import { BrandsController } from './classes/controller/brands.controller.ts';

interface IProps {
  controller: BrandsController;
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
