import React from 'react';

import { Module } from './components';

import { Provider } from './user.context.ts';

import { container } from './classes/classes.di.ts';
import { UserPresenter, UserPresenterSymbol } from './classes/presenter/user.presenter.ts';

export default function UserModule() {
  const presenter = container.get<UserPresenter>(UserPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <Module />
    </Provider>
  );
}
