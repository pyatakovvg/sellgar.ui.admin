import React from 'react';

import { Provider } from './module.context.ts';
import { createContainer } from './classes/classes.di.ts';
import { UnitPresenter, UnitPresenterSymbol } from './classes/presenter/unit.presenter.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [container] = React.useState(() => createContainer());

  React.useEffect(() => {
    return () => {
      container.unbindAll();
    };
  }, []);

  return (
    <Provider
      value={{
        presenter: container.get<UnitPresenter>(UnitPresenterSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
