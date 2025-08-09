import { ContainerModule } from 'inversify';

import { CategoryStore } from './store/category.store.ts';
import { CategoryStoreInterface } from './store/category-store.interface.ts';

import { CategoryController } from './controller/category.controller.ts';
import { CategoryControllerInterface } from './controller/category-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<CategoryStoreInterface>(CategoryStoreInterface).to(CategoryStore).inSingletonScope();

  container.bind<CategoryControllerInterface>(CategoryControllerInterface).to(CategoryController);
});
