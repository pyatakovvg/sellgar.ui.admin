import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { FormStore } from './store/form.store.ts';
import { FormStoreInterface } from './store/form-store.interface.ts';

import { SignInController } from './controller/sign-in.controller.ts';
import { SignInControllerInterface } from './controller/sign-in-controller.interface.ts';

export class SignInBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(FormStoreInterface).to(FormStore);
    registry.bind(SignInControllerInterface).to(SignInController);
  }
}
