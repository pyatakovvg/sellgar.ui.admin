import { IsUUID } from 'class-validator';

import { CreateProductDto } from './create-product.dto.ts';

export class UpdateProductDto extends CreateProductDto {
  @IsUUID()
  uuid: string;
}
