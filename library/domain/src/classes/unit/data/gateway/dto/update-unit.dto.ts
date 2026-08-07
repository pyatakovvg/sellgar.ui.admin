import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { CreateUnitDto } from './create-unit.dto.ts';
import type { UpdateUnitInput } from '../input/update-unit.input.ts';

export class UpdateUnitDto extends CreateUnitDto implements UpdateUnitInput {
  @Expose()
  @IsNumber()
  version: number;
}
