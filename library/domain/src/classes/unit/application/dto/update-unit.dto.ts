import { IsNumber } from 'class-validator';

import { CreateUnitDto } from './create-unit.dto.ts';

export class UpdateUnitDto extends CreateUnitDto {
  @IsNumber()
  version: number;
}
