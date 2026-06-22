import { Module, UseBindings } from '@tiyn/app';

import { DashboardView } from './view';

import { DashboardBindings } from './classes/classes.di.ts';

@UseBindings(DashboardBindings)
@Module({
  view: DashboardView,
})
export class DashboardModule {}
