import React from 'react';

import { UsersView } from './View';

import { Provider } from './user.context.ts';
import { container } from './classes/classes.di.ts';
import { UserPresenter, UserPresenterSymbol } from './classes/presenter/user.presenter.ts';

export default function UserModule() {
  return () => (
    <Provider value={{ presenter: container.get<UserPresenter>(UserPresenterSymbol) }}>
      <UsersView />
    </Provider>
  );
}
