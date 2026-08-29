import { ProductChangesProvider } from '@library/provider';
import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/react';

import { ProductModifyBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(ProductModifyBindings)
@Module({
  providers: [ProductChangesProvider],
  view: ModuleView,
})
export class ProductModifyModule {}
