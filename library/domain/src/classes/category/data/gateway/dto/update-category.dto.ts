import { Expose } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

import { CreateCategoryDto } from './create-category.dto.ts';
import type { UpdateCategoryInput } from '../input/update-category.input.ts';

export class UpdateCategoryDto extends CreateCategoryDto implements UpdateCategoryInput {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsNumber()
  version: number;
}
