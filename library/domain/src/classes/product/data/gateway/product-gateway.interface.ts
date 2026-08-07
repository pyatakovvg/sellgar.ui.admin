import { CreateProductInput } from './input/create-product.input.ts';
import { UpdateProductInput } from './input/update-product.input.ts';

import { ProductEntity } from '../../domain/product.entity.ts';
import { ProductResultEntity } from '../../domain/product-result.entity.ts';

export abstract class ProductGatewayInterface {
  abstract findAll(): Promise<ProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<ProductEntity>;
  abstract create(input: CreateProductInput): Promise<ProductEntity>;
  abstract update(uuid: string, input: UpdateProductInput): Promise<ProductEntity>;
}
