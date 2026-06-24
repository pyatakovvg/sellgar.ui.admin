import { IsUUID } from 'class-validator';

import { CreatePropertyGroupDto } from './create-property-group.dto.ts';

export class UpdatePropertyGroupDto extends CreatePropertyGroupDto {
  @IsUUID()
  uuid: string;
}
