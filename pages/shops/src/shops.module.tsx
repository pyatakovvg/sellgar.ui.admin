import { Module, UseBindings } from '@sellgar/app';

import { ShopsBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(ShopsBindings)
@Module({
  view: ModuleView,
})
export class ShopsModule {}
