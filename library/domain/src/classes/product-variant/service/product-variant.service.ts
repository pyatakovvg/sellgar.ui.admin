import { inject, injectable } from 'inversify';

import { ProductVariantServiceInterface } from './product-variant-service.interface.ts';
import { ProductVariantGatewayInterface } from '../gateway/product-variant-gateway.interface.ts';

import { CreateProductDto } from '../gateway/dto/create-product.dto.ts';
import { UpdateProductDto } from '../gateway/dto/update-product.dto.ts';

import { ProductVariantEntity, ProductVariantResultEntity } from '../product-variant.entity.ts';

@injectable()
export class ProductVariantService implements ProductVariantServiceInterface {
  constructor(
    @inject(ProductVariantGatewayInterface) private readonly productGateway: ProductVariantGatewayInterface,
  ) {}

  async findAll(): Promise<ProductVariantResultEntity> {
    return await this.productGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<ProductVariantEntity | null> {
    return await this.productGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateProductDto): Promise<ProductVariantEntity> {
    return this.productGateway.update(uuid, dto);
  }

  async create(dto: CreateProductDto): Promise<ProductVariantEntity> {
    return await this.productGateway.create(dto);
  }
}
