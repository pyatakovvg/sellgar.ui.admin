import { AddVariantImageInput } from './input/add-variant-image.input.ts';
import { CreateVariantInput } from './input/create-variant.input.ts';
import { UpdateVariantInput } from './input/update-variant.input.ts';

import { VariantEntity } from '../../domain/variant.entity.ts';
import { ProductVariantResultEntity } from '../../domain/product-variant-result.entity.ts';

export abstract class VariantGatewayInterface {
  abstract findAll(): Promise<ProductVariantResultEntity>;
  abstract findByUuid(uuid: string): Promise<VariantEntity | null>;
  abstract create(input: CreateVariantInput): Promise<VariantEntity>;
  abstract update(uuid: string, input: UpdateVariantInput): Promise<VariantEntity>;
  abstract addImage(variantUuid: string, input: AddVariantImageInput): Promise<VariantEntity>;
  abstract removeImage(variantUuid: string, imageUuid: string): Promise<VariantEntity>;
}
