import React from 'react';

import { UsersView } from './components';

import { Provider } from './users.context.ts';
import { container } from './classes/classes.di.ts';
import { UserPresenter, UserPresenterSymbol } from './classes/presenter/user.presenter.ts';

export default function UsersModule() {
  const presenter = container.get<UserPresenter>(UserPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <UsersView />
    </Provider>
  );
}
