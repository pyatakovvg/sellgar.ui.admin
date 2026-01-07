import { Module } from '@library/app';

import React from 'react';

import { ModifyView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { StoreControllerInterface } from './classes/controller/store-controller.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [StoreControllerInterface],
  view: <ModifyView />,
})
export class ClassModule {}
