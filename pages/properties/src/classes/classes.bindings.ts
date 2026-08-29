import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { PropertyControllerInterface } from './controller/property/property-controller.interface.ts';
import { PropertyController } from './controller/property/property.controller.ts';

export class PropertiesBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PropertyControllerInterface).to(PropertyController);
  }
}
