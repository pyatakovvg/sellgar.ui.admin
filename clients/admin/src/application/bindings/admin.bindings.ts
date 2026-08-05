import { DomainBindings } from '@library/domain';
import { MessageBindings } from '@library/message';
import { PushBindings } from '@library/push';
import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

export class AdminBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    new DomainBindings().register(registry);
    new MessageBindings().register(registry);
    new PushBindings().register(registry);
  }
}
