import { Module } from '@library/app';

import React from 'react';

import { UnitView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { UnitsControllerInterface } from './classes/controller/units-controller.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [UnitsControllerInterface],
  view: <UnitView />,
})
export class ClassModule {}
