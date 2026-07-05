import type { CreateProductDto } from '../controller/dto/create-product.dto.ts';

type VariantImageFormData = NonNullable<CreateProductDto['variants'][number]['images']>[number];

export abstract class ProductImageServiceInterface {
  abstract getFileImageUrl(fileUuid: string): string;

  abstract addGalleryImages(currentImages: VariantImageFormData[], files: File[]): VariantImageFormData[];
}
