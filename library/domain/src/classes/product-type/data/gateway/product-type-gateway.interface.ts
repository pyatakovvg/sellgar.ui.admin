import { ProductTypeEntity } from '../../domain/product-type.entity.ts';
import { ProductTypeResultEntity } from '../../domain/product-type-result.entity.ts';
import type { CreateProductTypeInput } from './input/create-product-type.input.ts';
import type { UpdateProductTypeInput } from './input/update-product-type.input.ts';

export abstract class ProductTypeGatewayInterface {
  abstract findAll(): Promise<ProductTypeResultEntity>;
  abstract findByUuid(uuid: string): Promise<ProductTypeEntity>;
  abstract create(input: CreateProductTypeInput): Promise<ProductTypeEntity>;
  abstract update(uuid: string, input: UpdateProductTypeInput): Promise<ProductTypeEntity>;
}
