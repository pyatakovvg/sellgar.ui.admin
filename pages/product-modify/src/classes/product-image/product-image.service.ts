import { FileServiceInterface } from '@library/domain';
import { Inject, Injectable } from '@sellgar/app';

import { ProductImageServiceInterface } from './product-image-service.interface.ts';

import type { CreateProductDto } from '../controller/dto/create-product.dto.ts';

type VariantImageFormData = NonNullable<CreateProductDto['variants'][number]['images']>[number];

@Injectable()
export class ProductImageService implements ProductImageServiceInterface {
  constructor(@Inject(FileServiceInterface) private readonly fileService: FileServiceInterface) {}

  getFileImageUrl(fileUuid: string) {
    return this.fileService.getPublicImageUrl(fileUuid);
  }

  addGalleryImages(currentImages: VariantImageFormData[], files: File[]): VariantImageFormData[] {
    const startOrder = currentImages.length;

    return currentImages.concat(
      files.map((file, index) => ({
        localId: globalThis.crypto.randomUUID(),
        order: startOrder + index,
        file,
        fileName: file.name,
        alt: null,
      })),
    );
  }
}
