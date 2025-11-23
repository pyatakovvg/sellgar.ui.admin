import { Module } from '@library/app';

import React from 'react';

import { ModuleView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { ProductControllerInterface } from './classes/controller/product-controller.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [ProductControllerInterface],
  view: <ModuleView />,
})
export class ClassModule {}
