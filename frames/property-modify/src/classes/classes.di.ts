import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { PropertyGroupListController } from './controller/property-group-list.controller.ts';
import { PropertyGroupListControllerInterface } from './controller/property-group-list-controller.interface.ts';
import { PropertyModifyController } from './controller/property-modify.controller.ts';
import { PropertyModifyControllerInterface } from './controller/property-modify-controller.interface.ts';
import { UnitListController } from './controller/unit-list.controller.ts';
import { UnitListControllerInterface } from './controller/unit-list-controller.interface.ts';

export class PropertyModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PropertyModifyControllerInterface).to(PropertyModifyController);
    registry.bind(PropertyGroupListControllerInterface).to(PropertyGroupListController);
    registry.bind(UnitListControllerInterface).to(UnitListController);
  }
}
