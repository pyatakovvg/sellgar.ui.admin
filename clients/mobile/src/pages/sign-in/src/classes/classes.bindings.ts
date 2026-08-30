import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { SignInControllerInterface } from './controller/sign-in-controller.interface.ts';
import { SignInController } from './controller/sign-in.controller.ts';

export class SignInBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(SignInControllerInterface).to(SignInController);
  }
}
