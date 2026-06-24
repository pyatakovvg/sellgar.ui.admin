import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { PropertyModifyController } from './controller/property-modify.controller.ts';
import { PropertyModifyControllerInterface } from './controller/property-modify-controller.interface.ts';

export class PropertyModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(FormStoreInterface).to(FormStore);
    registry.bind(PropertyModifyControllerInterface).to(PropertyModifyController);
  }
}
