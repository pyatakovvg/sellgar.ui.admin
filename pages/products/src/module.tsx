import { Module, UseBindings } from '@sellgar/app';

import { ProductsView } from './view';
import { ProductChangesProvider } from '@library/provider';

import { ProductsBindings } from './classes/classes.di.ts';

@UseBindings(ProductsBindings)
@Module({
  providers: [ProductChangesProvider],
  view: ProductsView,
})
export class ProductsModule {}
