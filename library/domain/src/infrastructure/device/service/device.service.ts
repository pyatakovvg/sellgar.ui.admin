import { uuid } from '@utils/generate';

import { Inject, Injectable } from '@sellgar/app';

import { StorageServiceInterface } from '../../storage/service/storage-service.interface.ts';

import type { DeviceInfo } from './device-info.interface.ts';
import { DeviceServiceInterface } from './device-service.interface.ts';

@Injectable()
export class DeviceService implements DeviceServiceInterface {
  constructor(@Inject(StorageServiceInterface) private storageService: StorageServiceInterface<DeviceInfo>) {}

  getUniqueId() {
    const deviceId = this.storageService.get('deviceId');

    if (deviceId) {
      return deviceId;
    }

    const newDeviceId = uuid();

    this.storageService.set('deviceId', newDeviceId);

    return newDeviceId;
  }
}
