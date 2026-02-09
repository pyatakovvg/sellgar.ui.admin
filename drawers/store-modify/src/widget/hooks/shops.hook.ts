import { useWidgetController } from '@library/app';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useShops = () => {
  const controller = useWidgetController(StoreControllerInterface);

  return controller.shopStore.shops;
};
