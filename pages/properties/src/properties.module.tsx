import { Module, UseBindings } from '@sellgar/app';

import { PropertiesBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(PropertiesBindings)
@Module({
  view: ModuleView,
})
export class PropertiesModule {}
