import { Module, UseBindings } from '@sellgar/app';

import { BrandsBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(BrandsBindings)
@Module({
  view: ModuleView,
})
export class BrandsModule {}
