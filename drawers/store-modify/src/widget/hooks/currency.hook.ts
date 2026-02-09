import { useWidgetController } from '@library/app';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useCurrency = () => {
  const controller = useWidgetController(StoreControllerInterface);

  return controller.currencyStore.currency;
};
