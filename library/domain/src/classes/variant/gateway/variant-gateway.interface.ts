import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { VariantEntity, ProductVariantResultEntity } from '../variant.entity.ts';

export abstract class VariantGatewayInterface {
  abstract findAll(): Promise<ProductVariantResultEntity>;
  abstract findByUuid(uuid: string): Promise<VariantEntity | null>;
  abstract create(dto: CreateProductDto): Promise<VariantEntity>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<VariantEntity>;
}
