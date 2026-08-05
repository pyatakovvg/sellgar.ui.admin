import { uuid } from '@utils/generate';

import { Inject, Injectable } from '@sellgar/app';

import { StorageServiceInterface } from '../../storage';

import { DeviceServiceInterface } from './device-service.interface.ts';

interface IDeviceInfo {
  deviceId: string;
}

@Injectable()
export class DeviceService implements DeviceServiceInterface {
  constructor(@Inject(StorageServiceInterface) private storageService: StorageServiceInterface<IDeviceInfo>) {}

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
