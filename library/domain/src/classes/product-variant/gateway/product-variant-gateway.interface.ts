import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { ProductVariantEntity, ProductVariantResultEntity } from '../product-variant.entity.ts';

export abstract class ProductVariantGatewayInterface {
  abstract findAll(): Promise<ProductVariantResultEntity>;
  abstract findByUuid(uuid: string): Promise<ProductVariantEntity | null>;
  abstract create(dto: CreateProductDto): Promise<ProductVariantEntity>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<ProductVariantEntity>;
}
