import { CreateProductDto } from '../gateway/dto/create-product.dto.ts';
import { UpdateProductDto } from '../gateway/dto/update-product.dto.ts';

import { VariantEntity, ProductVariantResultEntity } from '../variant.entity.ts';

export abstract class VariantServiceInterface {
  abstract findAll(): Promise<ProductVariantResultEntity>;
  abstract findByUuid(uuid: string): Promise<VariantEntity | null>;
  abstract create(dto: CreateProductDto): Promise<VariantEntity>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<VariantEntity>;
}
