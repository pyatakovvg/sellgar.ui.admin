import { Expose } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';
import type { UpdateBrandInput } from '../input/update-brand.input.ts';

import { CreateBrandDto } from './create-brand.dto.ts';

export class UpdateBrandDto extends CreateBrandDto implements UpdateBrandInput {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;
}
