import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { DashboardConstructor } from './constructor/dashboard.constructor.ts';
import { DashboardConstructorInterface } from './constructor/dashboard-constructor.interface.ts';

export class DashboardBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(DashboardConstructorInterface).to(DashboardConstructor);
  }
}
