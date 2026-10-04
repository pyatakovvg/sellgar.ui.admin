import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';

import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { ProductEntity } from '../../domain/product.entity.ts';
import { ProductResultEntity } from '../../domain/product-result.entity.ts';
import { ProductFormDataFactoryInterface } from './factory/product-form-data-factory.interface.ts';
import { CreateProductInput } from './input/create-product.input.ts';
import { CreateVariantInput } from './input/create-variant.input.ts';
import { UpdateProductInput } from './input/update-product.input.ts';
import { UpdateVariantInput } from './input/update-variant.input.ts';
import { ProductDtoMapper } from './mapper/product-dto.mapper.ts';
import { ProductGatewayInterface } from './product-gateway.interface.ts';

@Injectable()
export class ProductGateway implements ProductGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
    @Inject(ProductFormDataFactoryInterface) private readonly formDataFactory: ProductFormDataFactoryInterface,
  ) {}

  async findAll(): Promise<ProductResultEntity> {
    const result = await this.requestExecutor.run({ scope: 'products:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/products');
    });
    const entity = plainToInstance(ProductResultEntity, result);

    await validateOrReject(entity);

    return entity;
  }

  async findByUuid(uuid: string): Promise<ProductEntity> {
    const result = await this.requestExecutor.run({ scope: `product:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/products/' + uuid);
    });
    return this.toProduct(result);
  }

  async create(input: CreateProductInput): Promise<ProductEntity> {
    const dto = ProductDtoMapper.create(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'product:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/products', this.formDataFactory.createProduct(dto));
    });
    return this.toProduct(result);
  }

  async update(uuid: string, input: UpdateProductInput): Promise<ProductEntity> {
    const dto = ProductDtoMapper.update(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `product:update:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/products/' + uuid, dto);
    });
    return this.toProduct(result);
  }

  async createVariant(uuid: string, input: CreateVariantInput): Promise<ProductEntity> {
    const dto = ProductDtoMapper.createVariant(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `product:create-variant:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(
        this.config.get('GATEWAY_API') + `/v2/products/${uuid}/variants`,
        this.formDataFactory.createVariant(dto),
      );
    });
    return this.toProduct(result);
  }

  async updateVariant(uuid: string, variantUuid: string, input: UpdateVariantInput): Promise<ProductEntity> {
    const dto = ProductDtoMapper.updateVariant(input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `product:update-variant:${variantUuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(
        this.config.get('GATEWAY_API') + `/v2/products/${uuid}/variants/${variantUuid}`,
        this.formDataFactory.updateVariant(dto),
      );
    });
    return this.toProduct(result);
  }

  async archiveVariant(uuid: string, variantUuid: string, version: number): Promise<ProductEntity> {
    const result = await this.requestExecutor.run({ scope: `product:archive-variant:${variantUuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + `/v2/products/${uuid}/variants/${variantUuid}/archive`, {
        version,
      });
    });
    return this.toProduct(result);
  }

  private async toProduct(result: unknown): Promise<ProductEntity> {
    const entity = plainToInstance(ProductEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
