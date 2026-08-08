import { Module, UseBindings } from '@sellgar/app';

import { ModuleView } from './view';
import { ProductChangesProvider } from '@library/provider';

import { ProductModifyBindings } from './classes/classes.di.ts';

@UseBindings(ProductModifyBindings)
@Module({
  providers: [ProductChangesProvider],
  view: ModuleView,
})
export class ClassModule {}
