import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

import { type BrandGatewayInterface } from './brand-gateway.interface.ts';

import { BrandEntity, BrandResultEntity } from '../brand.entity.ts';

@injectable()
export class BrandGateway implements BrandGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async update(uuid: string, dto: UpdateBrandDto) {
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid, this.createBrandFormData(dto));
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(dto: CreateBrandDto) {
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/brands', this.createBrandFormData(dto));
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid);
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findAll() {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/brands');
    const resultInstance = plainToInstance(BrandResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  private createBrandFormData(dto: CreateBrandDto | UpdateBrandDto) {
    const formData = new FormData();
    const image = dto.image?.file
      ? {
          localId: dto.image.localId ?? globalThis.crypto.randomUUID(),
          fileName: dto.image.fileName ?? dto.image.file.name,
          alt: dto.image.alt ?? null,
        }
      : dto.image
        ? {
            imageUuid: dto.image.imageUuid,
            fileName: dto.image.fileName,
            alt: dto.image.alt ?? null,
          }
        : null;

    if (dto.image?.file && image?.localId) {
      formData.append(`image:${image.localId}`, dto.image.file, dto.image.file.name);
    }

    formData.append(
      'payload',
      JSON.stringify({
        ...dto,
        image,
      }),
    );

    return formData;
  }
}
