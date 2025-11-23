import { useController } from '@library/app';

import { SignInControllerInterface } from '../classes/controller/sign-in-controller.interface.ts';

export const useInProcess = () => {
  const controller = useController(SignInControllerInterface);

  return controller.formStore.inProcess;
};
