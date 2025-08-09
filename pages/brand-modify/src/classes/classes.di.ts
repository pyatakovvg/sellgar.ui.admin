import { ContainerModule } from 'inversify';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { BrandController } from './controller/brand.controller.ts';
import { BrandControllerInterface } from './controller/brand-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);

  container.bind<BrandControllerInterface>(BrandControllerInterface).to(BrandController);
});
