import { useController } from '@library/app';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useShops = () => {
  const controller = useController(StoreControllerInterface);

  return controller.shopStore.shops;
};
