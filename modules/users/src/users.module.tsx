import React from 'react';

import { UsersView } from './View';

import { Provider } from './users.context.ts';
import { container } from './classes/classes.di.ts';
import { UserPresenter, UserPresenterSymbol } from './classes/presenter/user.presenter.ts';

export default function UsersModule() {
  return () => (
    <Provider value={{ presenter: container.get<UserPresenter>(UserPresenterSymbol) }}>
      <UsersView />
    </Provider>
  );
}
