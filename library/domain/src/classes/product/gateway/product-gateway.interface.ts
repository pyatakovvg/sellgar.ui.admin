import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { ProductEntity, ProductResultEntity } from '../product.entity.ts';

export abstract class ProductGatewayInterface {
  abstract findAll(): Promise<ProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<ProductEntity | null>;
  abstract create(dto: CreateProductDto): Promise<ProductEntity>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<ProductEntity>;
}
