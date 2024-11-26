import React from 'react';

import { Provider } from './application.context';
import { container } from './classes/classes.di.ts';

import { ApplicationPresenter, ApplicationPresenterSymbol } from './classes/presenters/application.presenter.ts';

export const ApplicationProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        presenter: container.get<ApplicationPresenter>(ApplicationPresenterSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
