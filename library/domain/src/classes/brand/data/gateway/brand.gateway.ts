import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { BrandEntity } from '../../domain/brand.entity.ts';
import { BrandResultEntity } from '../../domain/brand-result.entity.ts';
import { BrandFormDataFactoryInterface } from './factory/brand-form-data-factory.interface.ts';
import { CreateBrandInput } from './input/create-brand.input.ts';
import { UpdateBrandInput } from './input/update-brand.input.ts';
import { BrandDtoMapper } from './mapper/brand-dto.mapper.ts';
import { BrandGatewayInterface } from './brand-gateway.interface.ts';

@Injectable()
export class BrandGateway implements BrandGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
    @Inject(BrandFormDataFactoryInterface) private readonly formDataFactory: BrandFormDataFactoryInterface,
  ) {}

  async update(uuid: string, input: UpdateBrandInput): Promise<BrandEntity> {
    const dto = BrandDtoMapper.update(input);
    await validateOrReject(dto);
    const result = await this.httpClient.patch(
      this.config.get('GATEWAY_API') + '/v2/brands/' + uuid,
      this.formDataFactory.create(dto),
    );
    return this.toBrand(result);
  }

  async create(input: CreateBrandInput): Promise<BrandEntity> {
    const dto = BrandDtoMapper.create(input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + '/v2/brands',
      this.formDataFactory.create(dto),
    );
    return this.toBrand(result);
  }

  async findByUuid(uuid: string): Promise<BrandEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid);
    return this.toBrand(result);
  }

  async findAll(): Promise<BrandResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/brands');
    const entity = plainToInstance(BrandResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  private async toBrand(result: unknown): Promise<BrandEntity> {
    const entity = plainToInstance(BrandEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
