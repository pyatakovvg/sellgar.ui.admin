import { IsUUID } from 'class-validator';

import { CreatePersonDto } from './create-person.dto.ts';

export class UpdatePersonDto extends CreatePersonDto {
  @IsUUID()
  readonly uuid: string;
}
