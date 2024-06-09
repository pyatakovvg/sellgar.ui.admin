import React from 'react';

import { Provider } from '@/root//users.context.ts';

import { Module } from '@/components/Module.tsx';

import { container } from '@/classes/classes.di.ts';
import { UserPresenter, UserPresenterSymbol } from '@/classes/presenter/user.presenter.ts';

export default function UsersModule() {
  const presenter = container.get<UserPresenter>(UserPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <Module />
    </Provider>
  );
}
