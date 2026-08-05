import { Module, UseBindings } from '@sellgar/app';

import { ModuleView } from './view';

import { ProductModifyBindings } from './classes/classes.di.ts';

@UseBindings(ProductModifyBindings)
@Module({
  view: ModuleView,
})
export class ClassModule {}
