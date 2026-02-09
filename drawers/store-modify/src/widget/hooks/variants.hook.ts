import { useWidgetController } from '@library/app';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useVariants = () => {
  const controller = useWidgetController(StoreControllerInterface);

  return controller.variantsStore.variants;
};
