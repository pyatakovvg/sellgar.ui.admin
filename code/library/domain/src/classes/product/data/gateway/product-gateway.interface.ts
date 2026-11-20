import { ProductVariantDetailEntity } from '../../domain/product-variant-detail.entity.ts';
import { ProductVariantListEntity } from '../../domain/product-variant-list.entity.ts';
import { CreateProductInput } from './input/create-product.input.ts';
import { CreateVariantInput } from './input/create-variant.input.ts';
import { UpdateProductInput } from './input/update-product.input.ts';
import { UpdateVariantInput } from './input/update-variant.input.ts';

import { ProductEntity } from '../../domain/product.entity.ts';
import { ProductResultEntity } from '../../domain/product-result.entity.ts';
import type { ProductQueryInput } from './input/product-query.input.ts';

export abstract class ProductGatewayInterface {
  abstract findAll(query?: ProductQueryInput): Promise<ProductResultEntity>;
  abstract findByUuid(uuid: string): Promise<ProductEntity>;
  abstract findVariants(uuid: string): Promise<ProductVariantListEntity>;
  abstract findVariant(uuid: string, variantUuid: string): Promise<ProductVariantDetailEntity>;
  abstract restoreVariant(uuid: string, variantUuid: string, version: number): Promise<ProductEntity>;
  abstract create(input: CreateProductInput): Promise<ProductEntity>;
  abstract update(uuid: string, input: UpdateProductInput): Promise<ProductEntity>;
  abstract createVariant(uuid: string, input: CreateVariantInput): Promise<ProductEntity>;
  abstract updateVariant(uuid: string, variantUuid: string, input: UpdateVariantInput): Promise<ProductEntity>;
  abstract archiveVariant(uuid: string, variantUuid: string, version: number): Promise<ProductEntity>;
}
