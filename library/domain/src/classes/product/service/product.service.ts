import { inject, injectable } from 'inversify';

import { ProductServiceInterface } from './product-service.interface.ts';
import { ProductGatewayInterface } from '../gateway/product-gateway.interface.ts';

import { CreateProductDto } from '../gateway/dto/create-product.dto.ts';
import { UpdateProductDto } from '../gateway/dto/update-product.dto.ts';

import { ProductEntity, ProductResultEntity } from '../product.entity.ts';

@injectable()
export class ProductService implements ProductServiceInterface {
  constructor(@inject(ProductGatewayInterface) private readonly productGateway: ProductGatewayInterface) {}

  async findAll(): Promise<ProductResultEntity> {
    return await this.productGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<ProductEntity | null> {
    return await this.productGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateProductDto): Promise<ProductEntity> {
    return this.productGateway.update(uuid, dto);
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    return await this.productGateway.create(dto);
  }
}
