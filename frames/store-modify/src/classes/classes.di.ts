import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CurrencyListController } from './controller/currency-list.controller.ts';
import { CurrencyListControllerInterface } from './controller/currency-list-controller.interface.ts';
import { ProductListController } from './controller/product-list.controller.ts';
import { ProductListControllerInterface } from './controller/product-list-controller.interface.ts';
import { ShopListController } from './controller/shop-list.controller.ts';
import { ShopListControllerInterface } from './controller/shop-list-controller.interface.ts';
import { StoreModifyController } from './controller/store-modify.controller.ts';
import { StoreModifyControllerInterface } from './controller/store-modify-controller.interface.ts';

export class StoreModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(StoreModifyControllerInterface).to(StoreModifyController);
    registry.bind(ShopListControllerInterface).to(ShopListController);
    registry.bind(ProductListControllerInterface).to(ProductListController);
    registry.bind(CurrencyListControllerInterface).to(CurrencyListController);
  }
}
