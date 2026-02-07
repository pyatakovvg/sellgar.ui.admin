import React from 'react';

import { createWidget } from '@library/app';

import { WidgetView } from './view';
import { containerModule } from './classes/classes.di.ts';
import { LogoutControllerInterface } from './classes/controller/logout-controller.interface.ts';

export const Widget = createWidget({
  containerModule,
  controller: [LogoutControllerInterface],
  fallback: <p>loading...</p>,
  view: <WidgetView />,
});
