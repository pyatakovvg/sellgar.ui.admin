import { ContainerModule } from 'inversify';

import { ProductsStore } from './store/products.store.ts';
import { ProductsStoreInterface } from './store/products-store.interface.ts';
import { ProductsController } from './controller/products.controller.ts';
import { ProductsControllerInterface } from './controller/products-controller.interface.ts';

const create = () => {
  return new ContainerModule((container) => {
    container.bind<ProductsStoreInterface>(ProductsStoreInterface).to(ProductsStore);

    container.bind<ProductsControllerInterface>(ProductsControllerInterface).to(ProductsController);
  });
};
export { create };
