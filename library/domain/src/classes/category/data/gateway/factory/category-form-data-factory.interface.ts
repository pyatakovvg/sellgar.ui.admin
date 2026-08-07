import { CreateCategoryDto } from '../dto/create-category.dto.ts';
import { UpdateCategoryDto } from '../dto/update-category.dto.ts';

export abstract class CategoryFormDataFactoryInterface {
  abstract create(dto: CreateCategoryDto | UpdateCategoryDto): FormData;
}
