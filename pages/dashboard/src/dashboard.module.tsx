import { Module } from '@sellgar/app-v2/react';

import { ModuleView } from './view/module.view.tsx';

@Module({
  view: ModuleView,
})
export class DashboardModule {}
