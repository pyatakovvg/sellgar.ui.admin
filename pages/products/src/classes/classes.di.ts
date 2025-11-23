import { ContainerModule } from 'inversify';

import { ProductsController } from './controller/products.controller.ts';
import { ProductsControllerInterface } from './controller/products-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<ProductsControllerInterface>(ProductsControllerInterface).to(ProductsController);
});
