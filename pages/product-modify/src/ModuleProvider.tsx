import React from 'react';

import { Provider } from './module.context.ts';
import { createContainer } from './classes/classes.di.ts';
import { ProductPresenterInterface } from './classes/presenter/product-presenter.interface.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [container] = React.useState(() => createContainer());

  return (
    <Provider
      value={{
        presenter: container.get<ProductPresenterInterface>(ProductPresenterInterface),
      }}
    >
      {props.children}
    </Provider>
  );
};
