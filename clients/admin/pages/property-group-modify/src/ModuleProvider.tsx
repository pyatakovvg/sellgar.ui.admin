import React from 'react';

import { Provider } from './module.context.ts';
import { createContainer } from './classes/classes.di.ts';
import { PropertyGroupPresenter, PropertyGroupPresenterSymbol } from './classes/presenter/property-group.presenter.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [container] = React.useState(() => createContainer());

  return (
    <Provider
      value={{
        presenter: container.get<PropertyGroupPresenter>(PropertyGroupPresenterSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
