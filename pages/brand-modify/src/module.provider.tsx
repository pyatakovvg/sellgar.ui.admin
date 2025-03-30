import React from 'react';

import { Provider } from './module.context.ts';
import { BrandControllerInterface } from './classes/controller/brand-controller.interface.ts';

interface IProps {
  controller: BrandControllerInterface;
}

export const ModuleProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <Provider
      value={{
        presenter: props.controller,
      }}
    >
      {props.children}
    </Provider>
  );
};
