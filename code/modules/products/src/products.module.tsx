import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { ProductChangesProvider } from '@provider/product-changes';

import { ProductsBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(ProductsBindings)
@Module({
  providers: [ProductChangesProvider],
  view: ModuleView,
})
export class ProductsModule {}
