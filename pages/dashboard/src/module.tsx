import { Module } from '@library/app';

import React from 'react';

import { DashboardView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { DashboardConstructorInterface } from './classes/constructor/dashboard-constructor.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [DashboardConstructorInterface],
  view: <DashboardView />,
})
export class DashboardModule {}
