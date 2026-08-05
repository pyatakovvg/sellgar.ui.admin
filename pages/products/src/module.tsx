import { Module, UseBindings } from '@sellgar/app';

import { ProductsView } from './view';

import { ProductsBindings } from './classes/classes.di.ts';

@UseBindings(ProductsBindings)
@Module({
  view: ProductsView,
})
export class ProductsModule {}
