import React from 'react';

import { DashboardView } from './View';
import { Provider } from './dashboard.context.ts';
import { DashboardController } from './dashboard.controller.ts';

export function DashboardModule() {
  const controller = new DashboardController();

  return () => {
    return (
      <Provider value={{ controller }}>
        <DashboardView />
      </Provider>
    );
  };
}
