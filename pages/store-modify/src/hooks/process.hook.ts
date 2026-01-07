import { useController } from '@library/app';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useProcess = () => {
  const controller = useController(StoreControllerInterface);

  return controller.processStore.inProcess;
};
