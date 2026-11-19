import type { UpdateCategoryInput } from '../input/update-category.input.ts';
import { Expose } from 'class-transformer';
import { IsInt, IsUUID, Min } from 'class-validator';

import { CategoryFieldsDto } from './category-fields.dto';

export class UpdateCategoryDto extends CategoryFieldsDto implements UpdateCategoryInput {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsInt()
  @Min(1)
  expectedVersion: number;
}
