import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/react';

import { PropertiesBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(PropertiesBindings)
@Module({
  view: ModuleView,
})
export class PropertiesModule {}
