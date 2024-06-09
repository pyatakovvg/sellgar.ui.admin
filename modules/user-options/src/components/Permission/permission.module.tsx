import React from 'react';

import { Permission } from './view';

import { Provider } from './permission.context.ts';
import { container } from './classes/classes.di.ts';
import { PermissionPresenter, PermissionPresenterSymbol } from './classes/presenter/permission.presenter.ts';

export default function PermissionModule() {
  return (
    <Provider
      value={{
        presenter: container.get<PermissionPresenter>(PermissionPresenterSymbol),
      }}
    >
      <Permission />
    </Provider>
  );
}
