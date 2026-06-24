import { IsUUID } from 'class-validator';

import { CreatePropertyDto } from './create-property.dto.ts';

export class UpdatePropertyDto extends CreatePropertyDto {
  @IsUUID()
  uuid: string;
}
