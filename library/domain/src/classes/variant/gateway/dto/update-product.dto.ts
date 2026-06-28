import { IsNumber } from 'class-validator';

import { CreateProductDto } from './create-product.dto.ts';

export class UpdateProductDto extends CreateProductDto {
  uuid: string;

  @IsNumber()
  version: number;
}
