import { ContainerModule } from 'inversify';

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

export const containerModule = new ContainerModule((container) => {
  container.bind(ShopStoreInterface).to(ShopStore);
  container.bind(ProcessStoreInterface).to(ProcessStore);
  container.bind(VariantsStoreInterface).to(VariantsStore);
  container.bind(CurrencyStoreInterface).to(CurrencyStore);

  container.bind(StoreControllerInterface).to(StoreController);
});
