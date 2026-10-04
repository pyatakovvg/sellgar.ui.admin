import { plainToInstance } from 'class-transformer';

import { CreateProductDto } from '../dto/create-product.dto.ts';
import { CreateVariantDto } from '../dto/create-variant.dto.ts';
import { ProductVariantDto } from '../dto/product-variant.dto.ts';
import { ProductVariantImageDto } from '../dto/product-variant-image.dto.ts';
import { UpdateProductDto } from '../dto/update-product.dto.ts';
import { UpdateVariantDto } from '../dto/update-variant.dto.ts';
import type { CreateProductInput } from '../input/create-product.input.ts';
import type { CreateVariantInput } from '../input/create-variant.input.ts';
import type { UpdateProductInput } from '../input/update-product.input.ts';
import type { UpdateVariantInput } from '../input/update-variant.input.ts';
import type { ProductVariantInput } from '../input/product-variant.input.ts';
import type { ProductVariantImageInput } from '../input/product-variant-image.input.ts';

export class ProductDtoMapper {
  static create(input: CreateProductInput): CreateProductDto {
    const { variants, ...values } = input;
    const dto = plainToInstance(CreateProductDto, { ...values, variants: [] });
    dto.variants = variants.map((variant) => this.variant(variant));
    return dto;
  }

  static update(input: UpdateProductInput): UpdateProductDto {
    return plainToInstance(UpdateProductDto, input);
  }

  static createVariant(input: CreateVariantInput): CreateVariantDto {
    const dto = plainToInstance(CreateVariantDto, { ...input, variant: undefined });
    dto.variant = this.variant(input.variant);
    return dto;
  }

  static updateVariant(input: UpdateVariantInput): UpdateVariantDto {
    const { images, ...values } = input;
    const dto = plainToInstance(UpdateVariantDto, values);
    dto.images = images?.map((image) => this.image(image));
    return dto;
  }

  private static variant(input: ProductVariantInput): ProductVariantDto {
    const { images, ...values } = input;
    const dto = plainToInstance(ProductVariantDto, values);
    dto.images = images?.map((image) => this.image(image));
    return dto;
  }

  private static image(input: ProductVariantImageInput): ProductVariantImageDto {
    const { file, ...values } = input;
    const dto = plainToInstance(ProductVariantImageDto, values);
    dto.file = file;
    return dto;
  }
}
