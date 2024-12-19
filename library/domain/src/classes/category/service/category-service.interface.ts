import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { CategoryEntity, CategoryResultEntity } from '../../domain/category.entity.ts';

export abstract class CategoryServiceInterface {
  abstract findAll(): Promise<CategoryResultEntity>;
  abstract findByUuid(uuid: string): Promise<CategoryEntity>;
  abstract create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
  abstract update(uuid: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity>;
}
