import { DomainBinding } from '@library/domain';
import { MessageBindings } from '@library/message';
import { PushBindings } from '@library/push';
import {
  BindingModuleInterface,
  SessionExpirationNotifierInterface,
  type BindingRegistryInterface,
} from '@sellgar/app';

import { SessionExpirationNotifier } from '../session-expiration-notifier.ts';

export class AdminBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    new DomainBinding().register(registry);
    new MessageBindings().register(registry);
    new PushBindings().register(registry);
    registry.bind(SessionExpirationNotifierInterface).to(SessionExpirationNotifier).inSingletonScope();
  }
}
