import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ConfigInterface } from './config.interface.ts';
import { Config } from './config.ts';

export class ConfigBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ConfigInterface).to(Config);
  }
}
