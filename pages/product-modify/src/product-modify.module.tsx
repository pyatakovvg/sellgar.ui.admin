import { ProductChangesProvider } from '@library/provider';
import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { ProductModifyBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(ProductModifyBindings)
@Module({
  providers: [ProductChangesProvider],
  view: ModuleView,
})
export class ProductModifyModule {}
