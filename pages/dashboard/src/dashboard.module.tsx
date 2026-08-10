import { Module } from '@sellgar/app';

import { ModuleView } from './view/module.view.tsx';

@Module({
  view: ModuleView,
})
export class DashboardModule {}
