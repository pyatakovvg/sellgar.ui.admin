import React from 'react';

import { Provider } from './module.context.ts';
import { container } from './classes/classes.di.ts';
import { SignInPresenter, SignInPresenterSymbol } from './classes/presenter/sign-in.presenter.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        presenter: container.get<SignInPresenter>(SignInPresenterSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
