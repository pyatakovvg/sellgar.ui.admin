import { useWidgetController } from '@library/app';
import { CategoryControllerInterface } from '../classes/controller/category-controller.interface.ts';

export const useCategories = () => {
  const controller = useWidgetController(CategoryControllerInterface);

  return controller.formStore.categories;
};
