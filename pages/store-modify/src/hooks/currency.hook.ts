import { useController } from '@library/app';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useCurrency = () => {
  const controller = useController(StoreControllerInterface);

  return controller.currencyStore.currency;
};
