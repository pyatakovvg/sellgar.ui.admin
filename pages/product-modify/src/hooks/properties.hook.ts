import { useController } from '@library/app';

import { ProductControllerInterface } from '../classes/controller/product-controller.interface.ts';

export const useProperties = () => {
  const controller = useController(ProductControllerInterface);

  return controller.formStore.properties;
};
