import { Expose } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';
import type { UpdateVariantInput } from '../input/update-variant.input.ts';

import { CreateVariantDto } from './create-variant.dto.ts';

export class UpdateVariantDto extends CreateVariantDto implements UpdateVariantInput {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;
}
