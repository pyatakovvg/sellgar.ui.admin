import { Module, UseBindings } from '@sellgar/app';

import { DashboardView } from './view';

import { DashboardBindings } from './classes/classes.di.ts';

@UseBindings(DashboardBindings)
@Module({
  view: DashboardView,
})
export class DashboardModule {}
