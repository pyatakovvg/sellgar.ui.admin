import { IsNumber, IsUUID } from 'class-validator';

import { CreateBrandDto } from './create-brand.dto.ts';

export class UpdateBrandDto extends CreateBrandDto {
  @IsUUID()
  uuid: string;

  @IsNumber()
  version: number;
}
