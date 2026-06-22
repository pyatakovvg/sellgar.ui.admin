import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { PropertyGroupModifyController } from './controller/property-group-modify.controller.ts';
import { PropertyGroupModifyControllerInterface } from './controller/property-group-modify-controller.interface.ts';

export class PropertyGroupModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PropertyGroupModifyControllerInterface).to(PropertyGroupModifyController);
  }
}
