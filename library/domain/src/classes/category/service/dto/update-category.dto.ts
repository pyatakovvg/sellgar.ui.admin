import { IsNumber, IsUUID } from 'class-validator';

import { CreateCategoryDto } from './create-category.dto.ts';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsUUID()
  uuid: string;

  @IsNumber()
  version: number;
}
