import { Expose } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

import { CreateStoreProductDto } from './create-store-product.dto.ts';
import type { UpdateStoreProductInput } from '../input/update-store-product.input.ts';

export class UpdateStoreProductDto extends CreateStoreProductDto implements UpdateStoreProductInput {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  expectedVersion: number;
}
