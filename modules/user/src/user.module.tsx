import React from 'react';

import { UsersView } from './View';
import { Provider } from './user.context.ts';
import { UserController } from './user.controller.ts';

export default function UserModule() {
  const controller = new UserController();

  return () => (
    <Provider value={{ controller }}>
      <UsersView />
    </Provider>
  );
}
