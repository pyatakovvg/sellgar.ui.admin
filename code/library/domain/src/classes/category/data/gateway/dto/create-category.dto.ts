import type { CreateCategoryInput } from '../input/create-category.input.ts';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { CategoryFieldsDto } from './category-fields.dto';

export class CreateCategoryDto extends CategoryFieldsDto implements CreateCategoryInput {
  @Expose()
  @IsUUID()
  shopUuid: string;
}
