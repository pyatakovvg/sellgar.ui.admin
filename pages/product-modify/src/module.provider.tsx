import React from 'react';

import { Provider } from './module.context.ts';
import { ProductPresenterInterface } from './classes/presenter/product-presenter.interface.ts';

interface IProps {
  controller: ProductPresenterInterface;
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
