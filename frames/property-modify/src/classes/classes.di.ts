import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { PropertyModifyController } from './controller/property-modify.controller.ts';
import { PropertyModifyControllerInterface } from './controller/property-modify-controller.interface.ts';
import { UnitListController } from './controller/unit-list.controller.ts';
import { UnitListControllerInterface } from './controller/unit-list-controller.interface.ts';

export class PropertyModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PropertyModifyControllerInterface).to(PropertyModifyController);
    registry.bind(UnitListControllerInterface).to(UnitListController);
  }
}
