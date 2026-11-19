import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { FileServiceInterface } from './application/file-service.interface.ts';
import { FileService } from './application/file.service.ts';
import { FileGatewayInterface } from './data/gateway/file-gateway.interface.ts';
import { FileGateway } from './data/gateway/file.gateway.ts';
import { UploadFileFormDataFactory } from './data/gateway/factory/upload-file-form-data.factory.ts';
import { UploadFileFormDataFactoryInterface } from './data/gateway/factory/upload-file-form-data-factory.interface.ts';

export class FileBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UploadFileFormDataFactoryInterface).to(UploadFileFormDataFactory);
    registry.bind(FileGatewayInterface).to(FileGateway);
    registry.bind(FileServiceInterface).to(FileService);
  }
}
