import { IsUUID } from 'class-validator';

import { CreateUnitDto } from './create-unit.dto.ts';

export class UpdateUnitDto extends CreateUnitDto {
  @IsUUID()
  uuid: string;
}
