import { ProductVariantDto } from './product-variant.dto.ts';
import { ProductPropertyDto } from './product-property.dto.ts';

export class CreateProductDto {
  name: string;

  description: string;

  categoryUuid: string;

  brandUuid: string;

  variants: ProductVariantDto[];

  properties: ProductPropertyDto[];
}
