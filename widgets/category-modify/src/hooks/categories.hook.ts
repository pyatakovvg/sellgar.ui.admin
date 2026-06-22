import { useController } from '@tiyn/app';
import { CategoryControllerInterface } from '../classes/controller/category-controller.interface.ts';

export const useCategories = () => {
  const controller = useController(CategoryControllerInterface);

  return controller.formStore.categories;
};
