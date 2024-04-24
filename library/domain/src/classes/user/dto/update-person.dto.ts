import { IsUUID } from 'class-validator';

import { CreatePersonDto } from './create-person.dto.ts';
import { Exclude } from 'class-transformer';

export class UpdatePersonDto extends CreatePersonDto {
  @IsUUID()
  readonly uuid: string;
}
