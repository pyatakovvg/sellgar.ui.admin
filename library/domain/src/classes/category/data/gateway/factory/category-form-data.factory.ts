import { Injectable } from '@sellgar/app';

import { CreateCategoryDto } from '../dto/create-category.dto.ts';
import { UpdateCategoryDto } from '../dto/update-category.dto.ts';
import { CategoryFormDataFactoryInterface } from './category-form-data-factory.interface.ts';

@Injectable()
export class CategoryFormDataFactory implements CategoryFormDataFactoryInterface {
  create(dto: CreateCategoryDto | UpdateCategoryDto): FormData {
    const formData = new FormData();
    const image = dto.image?.file
      ? {
          localId: dto.image.localId ?? globalThis.crypto.randomUUID(),
          fileName: dto.image.fileName ?? dto.image.file.name,
          alt: dto.image.alt ?? null,
        }
      : dto.image
        ? {
            imageUuid: dto.image.imageUuid,
            fileName: dto.image.fileName,
            alt: dto.image.alt ?? null,
          }
        : null;

    if (dto.image?.file && image?.localId) {
      formData.append(`image:${image.localId}`, dto.image.file, dto.image.file.name);
    }

    formData.append('payload', JSON.stringify({ ...dto, image }));
    return formData;
  }
}
