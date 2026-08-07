import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { ProductVariantResultEntity } from '../../domain/product-variant-result.entity.ts';
import { VariantEntity } from '../../domain/variant.entity.ts';
import { AddVariantImageDto } from './dto/add-variant-image.dto.ts';
import { CreateVariantDto } from './dto/create-variant.dto.ts';
import { UpdateVariantDto } from './dto/update-variant.dto.ts';
import { AddVariantImageInput } from './input/add-variant-image.input.ts';
import { CreateVariantInput } from './input/create-variant.input.ts';
import { UpdateVariantInput } from './input/update-variant.input.ts';
import { VariantGatewayInterface } from './variant-gateway.interface.ts';

@Injectable()
export class VariantGateway implements VariantGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(): Promise<ProductVariantResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/variants');
    const entity = plainToInstance(ProductVariantResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async findByUuid(uuid: string): Promise<VariantEntity | null> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/variants/' + uuid);
    if (result === null) return null;
    return this.toVariant(result);
  }

  async create(input: CreateVariantInput): Promise<VariantEntity> {
    const dto = plainToInstance(CreateVariantDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/variants', dto);
    return this.toVariant(result);
  }

  async update(uuid: string, input: UpdateVariantInput): Promise<VariantEntity> {
    const dto = plainToInstance(UpdateVariantDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/variants/' + uuid, dto);
    return this.toVariant(result);
  }

  async addImage(variantUuid: string, input: AddVariantImageInput): Promise<VariantEntity> {
    const dto = plainToInstance(AddVariantImageDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + '/v2/variants/' + variantUuid + '/images',
      dto,
    );
    return this.toVariant(result);
  }

  async removeImage(variantUuid: string, imageUuid: string): Promise<VariantEntity> {
    const result = await this.httpClient.delete(
      this.config.get('GATEWAY_API') + '/v2/variants/' + variantUuid + '/images/' + imageUuid,
    );
    return this.toVariant(result);
  }

  private async toVariant(result: unknown): Promise<VariantEntity> {
    const entity = plainToInstance(VariantEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
