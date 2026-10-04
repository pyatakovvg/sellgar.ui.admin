import { Injectable } from '@sellgar/app';

import { CreateBrandDto } from '../dto/create-brand.dto.ts';
import { UpdateBrandDto } from '../dto/update-brand.dto.ts';
import { BrandFormDataFactoryInterface } from './brand-form-data-factory.interface.ts';

@Injectable()
export class BrandFormDataFactory implements BrandFormDataFactoryInterface {
  create(dto: CreateBrandDto | UpdateBrandDto): FormData {
    const formData = new FormData();
    const images = dto.images?.map((image, index) => {
      const sortOrder = image.sortOrder ?? index;

      if (!image.file) {
        return { imageUuid: image.imageUuid, sortOrder };
      }

      const localId = globalThis.crypto.randomUUID();
      formData.append(`image:${localId}`, image.file, image.file.name);
      return { localId, sortOrder };
    });

    formData.append('payload', JSON.stringify({ ...dto, images }));
    return formData;
  }
}
