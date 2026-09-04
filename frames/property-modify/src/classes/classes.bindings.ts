import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { PropertyModifyControllerInterface } from './controller/property-modify/property-modify-controller.interface.ts';
import { PropertyModifyController } from './controller/property-modify/property-modify.controller.ts';
import { UnitListControllerInterface } from './controller/unit-list/unit-list-controller.interface.ts';
import { UnitListController } from './controller/unit-list/unit-list.controller.ts';

export class PropertyModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PropertyModifyControllerInterface).to(PropertyModifyController);
    registry.bind(UnitListControllerInterface).to(UnitListController);
  }
}
