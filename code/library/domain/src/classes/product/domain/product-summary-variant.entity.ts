import { Expose } from 'class-transformer';
import { IsEnum, IsString, IsUUID } from 'class-validator';

import { ProductStatus } from './product-status.enum.ts';

export class ProductSummaryVariantEntity {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
