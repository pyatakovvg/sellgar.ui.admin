import React from 'react';

import { UsersView } from './View';
import { Provider } from './users.context.ts';
import { UsersController } from './users.controller';

export default function UsersModule() {
  const controller = new UsersController();

  return () => (
    <Provider value={{ controller }}>
      <UsersView />
    </Provider>
  );
}
