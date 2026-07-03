import { IsUUID } from 'class-validator';

import { CreateDto } from './create.dto.ts';

export class UpdateDto extends CreateDto {
  @IsUUID()
  uuid: string;
}
