import React from 'react';

import { Roles } from './view';

import { Provider } from './role.context.ts';
import { container } from './classes/classes.di.ts';
import { RolePresenter, RolePresenterSymbol } from './classes/presenter/role.presenter.ts';

export default function RoleModule() {
  return (
    <Provider
      value={{
        presenter: container.get<RolePresenter>(RolePresenterSymbol),
      }}
    >
      <Roles />
    </Provider>
  );
}
