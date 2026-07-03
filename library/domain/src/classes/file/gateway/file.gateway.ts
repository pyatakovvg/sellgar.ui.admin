import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';

import { FileGatewayInterface } from './file-gateway.interface.ts';

import { FileEntity, FileResultEntity } from '../domain/file.entity.ts';

@injectable()
export class FileGateway implements FileGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(filter: GetAllFileFilterDto) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/files', {
      params: filter,
    });
    const resultInstance = plainToInstance(FileResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async upload(files: File[], folderUuid?: string) {
    const formData = new FormData();

    for (const file of files) {
      formData.append('files', file);
    }

    if (folderUuid) {
      formData.append('folderUuid', folderUuid);
    }

    const result = await this.httpClient.post<FileEntity[]>(this.config.get('GATEWAY_API') + '/v1/files', formData);
    const resultInstance = plainToInstance(FileEntity, result);

    await Promise.all(resultInstance.map((file) => validateOrReject(file)));

    return resultInstance;
  }

  async delete(uuid: string) {
    const result = await this.httpClient.delete<FileEntity>(this.config.get('GATEWAY_API') + '/v1/files/' + uuid);
    const resultInstance = plainToInstance(FileEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async download(uuid: string) {
    return await this.httpClient.get<Blob>(this.config.get('GATEWAY_API') + '/v1/files/' + uuid, {
      responseType: 'blob',
    });
  }

  getPublicImageUrl(uuid: string) {
    return this.config.get('CDN_IMAGES_URL').replace(/\/$/, '') + '/' + uuid;
  }
}
