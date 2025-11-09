import { ContainerModule } from 'inversify';

import { CategoryController } from './controller/category.controller.ts';
import { CategoryControllerInterface } from './controller/category-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<CategoryControllerInterface>(CategoryControllerInterface).to(CategoryController);
});
