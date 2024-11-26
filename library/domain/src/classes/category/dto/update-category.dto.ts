import { CreateCategoryDto } from './create-category.dto.ts';

export class UpdateCategoryDto extends CreateCategoryDto {
  uuid: string;
}
