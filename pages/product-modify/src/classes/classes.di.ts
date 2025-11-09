import { ContainerModule } from 'inversify';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { ProductController } from './controller/product.controller.ts';
import { ProductControllerInterface } from './controller/product-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(FormStoreInterface).to(FormStore);

  container.bind(ProductControllerInterface).to(ProductController);
});
