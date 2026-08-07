import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { FileEntity } from '../../domain/file.entity.ts';
import { FileResultEntity } from '../../domain/file-result.entity.ts';
import { UploadFileEntity } from '../../domain/upload-file.entity.ts';
import { GetAllFileFilterDto } from './dto/get-all-file-filter.dto.ts';
import { UploadFileFormDataFactoryInterface } from './factory/upload-file-form-data-factory.interface.ts';
import { GetAllFileFilterInput } from './input/get-all-file-filter.input.ts';
import { FileGatewayInterface } from './file-gateway.interface.ts';

@Injectable()
export class FileGateway implements FileGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
    @Inject(UploadFileFormDataFactoryInterface) private readonly formDataFactory: UploadFileFormDataFactoryInterface,
  ) {}

  async findAll(filter: GetAllFileFilterInput): Promise<FileResultEntity> {
    const dto = plainToInstance(GetAllFileFilterDto, filter, { exposeUnsetFields: false });
    await validateOrReject(dto);
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/files', { params: dto });
    const entity = plainToInstance(FileResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async upload(files: UploadFileEntity[], folderUuid?: string): Promise<FileEntity[]> {
    const entities = plainToInstance(UploadFileEntity, files);
    await Promise.all(entities.map((file) => validateOrReject(file)));
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + '/v1/files',
      this.formDataFactory.create(entities, folderUuid),
    );
    const uploadedFiles = plainToInstance(FileEntity, result as object[]);
    await Promise.all(uploadedFiles.map((file) => validateOrReject(file)));
    return uploadedFiles;
  }

  async delete(uuid: string): Promise<FileEntity> {
    const result = await this.httpClient.delete(this.config.get('GATEWAY_API') + '/v1/files/' + uuid);
    const entity = plainToInstance(FileEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  download(uuid: string): Promise<Blob> {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/files/' + uuid, { responseType: 'blob' });
  }

  getPublicImageUrl(uuid: string): string {
    return this.config.get('CDN_IMAGES_URL').replace(/\/$/, '') + '/' + uuid;
  }
}
