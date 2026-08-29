import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { StorageServiceInterface } from './service/storage-service.interface.ts';
import { StorageService } from './service/storage.service.ts';

export class StorageBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(StorageServiceInterface).to(StorageService);
  }
}
