import React from 'react';

import { Provider } from './module.context.ts';
import { SignInPresenterInterface } from './classes/presenter/sign-in-presenter.interface.ts';

interface IProps {
  controller: SignInPresenterInterface;
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
