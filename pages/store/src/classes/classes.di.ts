import { ContainerModule } from 'inversify';

import { ProductsStore } from './store/products.store.ts';
import { ProductsStoreInterface } from './store/products-store.interface.ts';
import { StoreController } from './controller/store.controller.ts';
import { StoreControllerInterface } from './controller/store-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<ProductsStoreInterface>(ProductsStoreInterface).to(ProductsStore).inSingletonScope();

  container.bind<StoreControllerInterface>(StoreControllerInterface).to(StoreController);
});
