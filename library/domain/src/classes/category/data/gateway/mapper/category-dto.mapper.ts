import { plainToInstance } from 'class-transformer';

import { CategoryImageDto } from '../dto/category-image.dto.ts';
import { CreateCategoryDto } from '../dto/create-category.dto.ts';
import { UpdateCategoryDto } from '../dto/update-category.dto.ts';
import { CategoryImageInput } from '../input/category-image.input.ts';
import { CreateCategoryInput } from '../input/create-category.input.ts';
import { UpdateCategoryInput } from '../input/update-category.input.ts';

export class CategoryDtoMapper {
  static create(input: CreateCategoryInput): CreateCategoryDto {
    const { image, ...values } = input;
    const dto = plainToInstance(CreateCategoryDto, values);

    return Object.assign(new CreateCategoryDto(), dto, { image: this.image(image) });
  }

  static update(input: UpdateCategoryInput): UpdateCategoryDto {
    const { image, ...values } = input;
    const dto = plainToInstance(UpdateCategoryDto, values);

    return Object.assign(new UpdateCategoryDto(), dto, { image: this.image(image) });
  }

  private static image(image: CategoryImageInput | null | undefined): CategoryImageDto | null | undefined {
    if (!image) {
      return image;
    }

    const { file, ...values } = image;
    const dto = plainToInstance(CategoryImageDto, values);

    return Object.assign(new CategoryImageDto(), dto, { file });
  }
}
