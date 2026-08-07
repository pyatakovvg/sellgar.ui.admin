import { CreateProductInput } from '../data/gateway/input/create-product.input.ts';
import { UpdateProductInput } from '../data/gateway/input/update-product.input.ts';

import { ProductEntity } from '../domain/product.entity.ts';
import { ProductResultEntity } from '../domain/product-result.entity.ts';

export abstract class ProductServiceInterface {
  abstract findAll(): Promise<ProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<ProductEntity>;
  abstract create(input: CreateProductInput): Promise<ProductEntity>;
  abstract update(uuid: string, input: UpdateProductInput): Promise<ProductEntity>;
}
