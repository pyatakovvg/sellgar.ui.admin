import { Module } from '@library/app';

import React from 'react';

import { PropertyView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { PropertyControllerInterface } from './classes/controller/property-controller.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [PropertyControllerInterface],
  view: <PropertyView />,
})
export class ClassModule {}
