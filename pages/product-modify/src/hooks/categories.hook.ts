import { useController } from '@library/app';

import { ProductControllerInterface } from '../classes/controller/product-controller.interface.ts';

export const useCategories = () => {
  const controller = useController(ProductControllerInterface);

  return controller.formStore.categories;
};
