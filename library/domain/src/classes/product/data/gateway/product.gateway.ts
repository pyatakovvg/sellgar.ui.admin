import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { ProductEntity } from '../../domain/product.entity.ts';
import { ProductResultEntity } from '../../domain/product-result.entity.ts';
import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';
import { ProductFormDataFactoryInterface } from './factory/product-form-data-factory.interface.ts';
import { CreateProductInput } from './input/create-product.input.ts';
import { UpdateProductInput } from './input/update-product.input.ts';
import { ProductGatewayInterface } from './product-gateway.interface.ts';

@Injectable()
export class ProductGateway implements ProductGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
    @Inject(ProductFormDataFactoryInterface) private readonly formDataFactory: ProductFormDataFactoryInterface,
  ) {}

  async findAll(): Promise<ProductResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/products');
    const entity = plainToInstance(ProductResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async findByUuid(uuid: string): Promise<ProductEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/products/' + uuid);
    return this.toProduct(result);
  }

  async create(input: CreateProductInput): Promise<ProductEntity> {
    const dto = plainToInstance(CreateProductDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + '/v2/products',
      this.formDataFactory.create(dto),
    );
    return this.toProduct(result);
  }

  async update(uuid: string, input: UpdateProductInput): Promise<ProductEntity> {
    const dto = plainToInstance(UpdateProductDto, input);
    await validateOrReject(dto);
    const result = await this.httpClient.patch(
      this.config.get('GATEWAY_API') + '/v2/products/' + uuid,
      this.formDataFactory.create(dto),
    );
    return this.toProduct(result);
  }

  private async toProduct(result: unknown): Promise<ProductEntity> {
    const entity = plainToInstance(ProductEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
