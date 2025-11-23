import { ContainerModule } from 'inversify';

import { FormStore } from './store/form.store.ts';
import { FormStoreInterface } from './store/form-store.interface.ts';

import { SignInController } from './controller/sign-in.controller.ts';
import { SignInControllerInterface } from './controller/sign-in-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(FormStoreInterface).to(FormStore);

  container.bind(SignInControllerInterface).to(SignInController);
});
