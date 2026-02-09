import { createWidget } from '@library/app';

import React from 'react';

import { ModifyView, Fallback, Exception } from './view';

import { containerModule } from './classes/classes.di.ts';
import { StoreControllerInterface } from './classes/controller/store-controller.interface.ts';

export const Widget = createWidget({
  containerModule,
  controller: [StoreControllerInterface],
  error: <Exception />,
  fallback: <Fallback />,
  view: <ModifyView />,
});
