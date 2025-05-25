import React from 'react';

import { Provider } from './module.context.ts';
import { CategoryControllerInterface } from './classes/controller/category-controller.interface.ts';

interface IProps {
  controller: CategoryControllerInterface;
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
