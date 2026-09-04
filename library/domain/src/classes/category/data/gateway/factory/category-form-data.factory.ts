import { Injectable } from '@sellgar/app';

import { CreateCategoryDto } from '../dto/create-category.dto.ts';
import { UpdateCategoryDto } from '../dto/update-category.dto.ts';
import { CategoryFormDataFactoryInterface } from './category-form-data-factory.interface.ts';

@Injectable()
export class CategoryFormDataFactory implements CategoryFormDataFactoryInterface {
  create(dto: CreateCategoryDto | UpdateCategoryDto): FormData {
    const formData = new FormData();
    let image:
      { localId: string; fileName: string; alt: string | null } | { imageUuid?: string; alt: string | null } | null =
      null;

    if (dto.image?.file) {
      const localId = globalThis.crypto.randomUUID();
      image = {
        localId,
        fileName: dto.image.file.name,
        alt: dto.image.alt ?? null,
      };
      formData.append(`image:${localId}`, dto.image.file, dto.image.file.name);
    } else if (dto.image) {
      image = {
        imageUuid: dto.image.imageUuid,
        alt: dto.image.alt ?? null,
      };
    }

    formData.append('payload', JSON.stringify({ ...dto, image }));
    return formData;
  }
}
