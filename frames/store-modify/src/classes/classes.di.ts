import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { CurrencyListController } from './controller/currency-list.controller.ts';
import { CurrencyListControllerInterface } from './controller/currency-list-controller.interface.ts';
import { ShopListController } from './controller/shop-list.controller.ts';
import { ShopListControllerInterface } from './controller/shop-list-controller.interface.ts';
import { StoreModifyController } from './controller/store-modify.controller.ts';
import { StoreModifyControllerInterface } from './controller/store-modify-controller.interface.ts';
import { VariantListController } from './controller/variant-list.controller.ts';
import { VariantListControllerInterface } from './controller/variant-list-controller.interface.ts';

export class StoreModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(StoreModifyControllerInterface).to(StoreModifyController);
    registry.bind(ShopListControllerInterface).to(ShopListController);
    registry.bind(VariantListControllerInterface).to(VariantListController);
    registry.bind(CurrencyListControllerInterface).to(CurrencyListController);
  }
}
