import { ProductEntity } from '@library/domain';
import type { ControllerLoaderArgs } from '@tiyn/app';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

export abstract class ProductControllerInterface {
  abstract loader(args: ControllerLoaderArgs): Promise<ProductEntity | undefined>;
  abstract findByUuid(uuid?: string): Promise<ProductEntity | undefined>;
  abstract create(dto: CreateProductDto): Promise<ProductEntity>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<ProductEntity>;
  abstract getFileImageUrl(fileUuid: string): string;
  abstract addGalleryImages(
    currentImages: NonNullable<CreateProductDto['variants'][number]['images']>,
    files: File[],
  ): NonNullable<CreateProductDto['variants'][number]['images']>;
}
