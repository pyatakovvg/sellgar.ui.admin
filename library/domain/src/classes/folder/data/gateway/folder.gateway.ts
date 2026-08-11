import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { FolderEntity } from '../../domain/folder.entity.ts';
import { FolderResultEntity } from '../../domain/folder-result.entity.ts';
import { GetAllFolderFilterDto } from './dto/get-all-folder-filter.dto.ts';
import { GetAllFolderFilterInput } from './input/get-all-folder-filter.input.ts';
import { FolderGatewayInterface } from './folder-gateway.interface.ts';

@Injectable()
export class FolderGateway implements FolderGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async findByUuid(uuid: string): Promise<FolderEntity> {
    const result = await this.requestExecutor.run({ scope: `folder:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v1/folders/' + uuid);
    });
    const entity = plainToInstance(FolderEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async findAll(filter: GetAllFolderFilterInput): Promise<FolderResultEntity> {
    const dto = plainToInstance(GetAllFolderFilterDto, filter, { exposeUnsetFields: false });
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'folders:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v1/folders', { params: dto });
    });
    const entity = plainToInstance(FolderResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
