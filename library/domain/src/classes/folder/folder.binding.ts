import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { FolderServiceInterface } from './application/folder-service.interface.ts';
import { FolderService } from './application/folder.service.ts';
import { FolderGatewayInterface } from './data/gateway/folder-gateway.interface.ts';
import { FolderGateway } from './data/gateway/folder.gateway.ts';

export class FolderBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(FolderGatewayInterface).to(FolderGateway);
    registry.bind(FolderServiceInterface).to(FolderService);
  }
}
