import { Module, UseBindings } from '@sellgar/app';

import { ProductsView } from './view';

import { StoreBindings } from './classes/classes.di.ts';

@UseBindings(StoreBindings)
@Module({
  view: ProductsView,
})
export class ProductsModule {}
