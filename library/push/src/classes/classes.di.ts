import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { PushService, PushServiceSymbol } from './services/push.service.ts';

export class PushBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind<PushService>(PushServiceSymbol).to(PushService).inSingletonScope();
  }
}
