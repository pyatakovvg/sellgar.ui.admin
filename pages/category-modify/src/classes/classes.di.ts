import { ContainerModule } from 'inversify';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { CategoryController } from './controller/category.controller.ts';
import { CategoryControllerInterface } from './controller/category-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);

  container.bind<CategoryControllerInterface>(CategoryControllerInterface).to(CategoryController);
});
