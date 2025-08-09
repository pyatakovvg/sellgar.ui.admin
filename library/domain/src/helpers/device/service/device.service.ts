import { uuid } from '@utils/generate';

import { inject, injectable } from 'inversify';

import { StorageServiceInterface } from '../../storage';

import { DeviceServiceInterface } from './device-service.interface.ts';

interface IDeviceInfo {
  deviceId: string;
}

@injectable()
export class DeviceService implements DeviceServiceInterface {
  constructor(@inject(StorageServiceInterface) private storageService: StorageServiceInterface<IDeviceInfo>) {}

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
