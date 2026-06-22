import { Module, UseBindings } from '@tiyn/app';

import { ShopsView } from './view';

import { ShopBindings } from './classes/classes.di.ts';

@UseBindings(ShopBindings)
@Module({
  view: ShopsView,
})
export class ProductsModule {}
