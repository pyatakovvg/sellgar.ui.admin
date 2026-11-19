import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { DeviceServiceInterface } from './service/device-service.interface.ts';
import { DeviceService } from './service/device.service.ts';

export class DeviceBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(DeviceServiceInterface).to(DeviceService);
  }
}
