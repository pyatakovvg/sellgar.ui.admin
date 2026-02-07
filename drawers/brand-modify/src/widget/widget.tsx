import { createWidget } from '@library/app';

import React from 'react';

import { Modify, Fallback, Exception } from './view';

import { containerModule } from './classes/classes.di.ts';
import { BrandModifyControllerInterface } from './classes/controller/brand-modify-controller.interface.ts';

export const Widget = createWidget({
  containerModule,
  controller: [BrandModifyControllerInterface],
  error: <Exception />,
  fallback: <Fallback />,
  view: <Modify />,
});
