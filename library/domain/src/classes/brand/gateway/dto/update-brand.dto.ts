
import { IsNumber } from 'class-validator';

import { CreateBrandDto } from './create-brand.dto.ts';

export class UpdateBrandDto extends CreateBrandDto {
  @IsNumber()
  version: number;
}
