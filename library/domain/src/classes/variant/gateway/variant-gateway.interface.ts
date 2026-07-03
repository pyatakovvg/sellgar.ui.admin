import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';
import { AddVariantImageDto } from './dto/add-variant-image.dto.ts';

import { VariantEntity, ProductVariantResultEntity } from '../domain/variant.entity.ts';

export abstract class VariantGatewayInterface {
  abstract findAll(): Promise<ProductVariantResultEntity>;
  abstract findByUuid(uuid: string): Promise<VariantEntity | null>;
  abstract create(dto: CreateProductDto): Promise<VariantEntity>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<VariantEntity>;
  abstract addImage(variantUuid: string, dto: AddVariantImageDto): Promise<VariantEntity>;
  abstract removeImage(variantUuid: string, imageUuid: string): Promise<VariantEntity>;
}
