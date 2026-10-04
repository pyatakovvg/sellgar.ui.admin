import { Injectable } from '@sellgar/app';

import { CreateProductDto } from '../dto/create-product.dto.ts';
import { CreateVariantDto } from '../dto/create-variant.dto.ts';
import { ProductVariantImageDto } from '../dto/product-variant-image.dto.ts';
import { ProductVariantDto } from '../dto/product-variant.dto.ts';
import { UpdateVariantDto } from '../dto/update-variant.dto.ts';
import { ProductFormDataFactoryInterface } from './product-form-data-factory.interface.ts';

@Injectable()
export class ProductFormDataFactory implements ProductFormDataFactoryInterface {
  createProduct(dto: CreateProductDto): FormData {
    const formData = new FormData();
    const payload = {
      ...dto,
      variants: dto.variants.map((variant) => this.variant(variant, formData)),
    };
    return this.finish(formData, payload);
  }

  createVariant(dto: CreateVariantDto): FormData {
    const formData = new FormData();
    return this.finish(formData, { ...dto, variant: this.variant(dto.variant, formData) });
  }

  updateVariant(dto: UpdateVariantDto): FormData {
    const formData = new FormData();
    const images = dto.images?.map((image, index) => this.image(image, index, formData));
    return this.finish(formData, { ...dto, images });
  }

  private variant(variant: ProductVariantDto, formData: FormData) {
    return {
      ...variant,
      images: variant.images?.map((image, index) => this.image(image, index, formData)),
    };
  }

  private image(image: ProductVariantImageDto, index: number, formData: FormData) {
    const sortOrder = image.sortOrder ?? index;

    if (image.file) {
      const localId = globalThis.crypto.randomUUID();
      formData.append(`image:${localId}`, image.file, image.file.name);
      return { localId, sortOrder };
    }

    return { imageUuid: image.imageUuid, sortOrder };
  }

  private finish(formData: FormData, payload: object): FormData {
    formData.append('payload', JSON.stringify(payload));
    return formData;
  }
}
