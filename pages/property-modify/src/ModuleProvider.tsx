import React from 'react';

import { Provider } from './module.context.ts';
import { createContainer } from './classes/classes.di.ts';
import { PropertyPresenter, PropertyPresenterSymbol } from './classes/presenter/property.presenter.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [container] = React.useState(() => createContainer());

  return (
    <Provider
      value={{
        presenter: container.get<PropertyPresenter>(PropertyPresenterSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
