import React from 'react';

import { Provider } from './module.context.ts';
import { createContainer } from './classes/classes.di.ts';
import { SignInPresenterInterface } from './classes/presenter/sign-in-presenter.interface.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [container] = React.useState(() => createContainer());

  return (
    <Provider
      value={{
        presenter: container.get<SignInPresenterInterface>(SignInPresenterInterface),
      }}
    >
      {props.children}
    </Provider>
  );
};
