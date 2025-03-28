import React from 'react';

import { Provider } from './module.context.ts';
import { BrandsControllerInterface } from './classes/controller/brand-controller.interface.ts';

interface IProps {
  controller: BrandsControllerInterface;
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
