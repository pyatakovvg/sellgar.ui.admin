import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { CreatePersonDto } from './create-person.dto.ts';
import type { UpdatePersonInput } from '../input/update-user.input.ts';

export class UpdatePersonDto extends CreatePersonDto implements UpdatePersonInput {
  @Expose()
  @IsUUID()
  readonly uuid: string;
}
