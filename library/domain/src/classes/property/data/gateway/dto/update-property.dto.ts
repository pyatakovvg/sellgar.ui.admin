import { Expose } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

import { CreatePropertyDto } from './create-property.dto.ts';
import type { UpdatePropertyInput } from '../input/update-property.input.ts';

export class UpdatePropertyDto extends CreatePropertyDto implements UpdatePropertyInput {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;
}
