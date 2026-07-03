import { DomainBindings } from '@library/domain';
import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';


export class AdminBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    new DomainBindings().register(registry);
  }
}
