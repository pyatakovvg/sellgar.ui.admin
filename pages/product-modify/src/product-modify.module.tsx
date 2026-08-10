import { ProductChangesProvider } from '@library/provider';
import { Module, UseBindings } from '@sellgar/app';

import { ProductModifyBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(ProductModifyBindings)
@Module({
  providers: [ProductChangesProvider],
  view: ModuleView,
})
export class ProductModifyModule {}
