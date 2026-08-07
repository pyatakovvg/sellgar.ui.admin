import { Injectable } from '@sellgar/app';

import { CreateProductDto } from '../dto/create-product.dto.ts';
import { UpdateProductDto } from '../dto/update-product.dto.ts';
import { ProductFormDataFactoryInterface } from './product-form-data-factory.interface.ts';

@Injectable()
export class ProductFormDataFactory implements ProductFormDataFactoryInterface {
  create(dto: CreateProductDto | UpdateProductDto): FormData {
    const formData = new FormData();
    const payload = {
      ...dto,
      variants: dto.variants.map((variant) => ({
        ...variant,
        images: variant.images?.map((image, order) => {
          if (image.file) {
            const localId = globalThis.crypto.randomUUID();
            formData.append(`gallery:${localId}`, image.file, image.file.name);

            return {
              localId,
              fileName: image.file.name,
              order,
              alt: image.alt ?? null,
            };
          }

          return {
            uuid: image.uuid,
            imageUuid: image.imageUuid,
            order,
            alt: image.alt ?? null,
          };
        }),
      })),
    };

    formData.append('payload', JSON.stringify(payload));
    return formData;
  }
}
