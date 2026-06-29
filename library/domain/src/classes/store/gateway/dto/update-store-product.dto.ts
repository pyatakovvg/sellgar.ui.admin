import { IsNumber, IsUUID } from 'class-validator';

import { CreateStoreProductDto } from './create-store-product.dto.ts';

export class UpdateStoreProductDto extends CreateStoreProductDto {
  @IsUUID()
  uuid: string;

  @IsNumber()
  expectedVersion: number;
}
