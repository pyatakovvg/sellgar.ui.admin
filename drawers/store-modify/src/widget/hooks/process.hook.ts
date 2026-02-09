import { useWidgetController } from '@library/app';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useProcess = () => {
  const controller = useWidgetController(StoreControllerInterface);

  return controller.processStore.inProcess;
};
