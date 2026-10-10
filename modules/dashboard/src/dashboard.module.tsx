import { Module } from '@sellgar/app/react';

import { ModuleView } from './view/module.view.tsx';

@Module({
  view: ModuleView,
})
export class DashboardModule {}
