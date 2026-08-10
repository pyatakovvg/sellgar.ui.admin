import { Module, UseBindings } from '@sellgar/app';

import { UnitsBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(UnitsBindings)
@Module({
  view: ModuleView,
})
export class UnitsModule {}
