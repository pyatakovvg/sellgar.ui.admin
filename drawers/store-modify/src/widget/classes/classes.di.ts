import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { ShopStore } from './store/shop/shop.store.ts';
import { ShopStoreInterface } from './store/shop/shop-store.interface.ts';
import { ProcessStore } from './store/process/process.store.ts';
import { ProcessStoreInterface } from './store/process/process-store.interface.ts';
import { VariantsStore } from './store/variants/variants.store.ts';
import { VariantsStoreInterface } from './store/variants/variants-store.interface.ts';
import { CurrencyStore } from './store/currency/currency.store.ts';
import { CurrencyStoreInterface } from './store/currency/currency-store.interface.ts';

import { StoreController } from './controller/store.controller.ts';
import { StoreControllerInterface } from './controller/store-controller.interface.ts';

export class StoreModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ShopStoreInterface).to(ShopStore);
    registry.bind(ProcessStoreInterface).to(ProcessStore);
    registry.bind(VariantsStoreInterface).to(VariantsStore);
    registry.bind(CurrencyStoreInterface).to(CurrencyStore);
    registry.bind(StoreControllerInterface).to(StoreController);
  }
}
