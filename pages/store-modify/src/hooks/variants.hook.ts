import { useController } from '@library/app';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useVariants = () => {
  const controller = useController(StoreControllerInterface);

  return controller.variantsStore.variants;
};
