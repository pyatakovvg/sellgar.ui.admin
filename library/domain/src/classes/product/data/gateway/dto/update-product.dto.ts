import { Expose } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

import { CreateProductDto } from './create-product.dto.ts';
import type { UpdateProductInput } from '../input/update-product.input.ts';

export class UpdateProductDto extends CreateProductDto implements UpdateProductInput {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;
}
