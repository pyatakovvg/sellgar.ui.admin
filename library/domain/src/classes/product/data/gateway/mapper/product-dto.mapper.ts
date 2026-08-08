import { plainToInstance } from 'class-transformer';

import { CreateProductDto } from '../dto/create-product.dto.ts';
import { ProductPropertyDto } from '../dto/product-property.dto.ts';
import { ProductVariantImageDto } from '../dto/product-variant-image.dto.ts';
import { ProductVariantDto } from '../dto/product-variant.dto.ts';
import { UpdateProductDto } from '../dto/update-product.dto.ts';
import { CreateProductInput } from '../input/create-product.input.ts';
import { ProductPropertyInput } from '../input/product-property.input.ts';
import { ProductVariantImageInput } from '../input/product-variant-image.input.ts';
import { ProductVariantInput } from '../input/product-variant.input.ts';
import { UpdateProductInput } from '../input/update-product.input.ts';

export class ProductDtoMapper {
  static create(input: CreateProductInput): CreateProductDto {
    const { values, properties, variants } = this.values(input);
    const dto = plainToInstance(CreateProductDto, values);

    return Object.assign(new CreateProductDto(), dto, { properties, variants });
  }

  static update(input: UpdateProductInput): UpdateProductDto {
    const { values, properties, variants } = this.values(input);
    const dto = plainToInstance(UpdateProductDto, values);

    return Object.assign(new UpdateProductDto(), dto, { properties, variants });
  }

  private static values<TInput extends CreateProductInput>(input: TInput) {
    const { properties, variants, ...values } = input;

    return {
      values,
      properties: properties?.map((property) => this.property(property)),
      variants: variants.map((variant) => this.variant(variant)),
    };
  }

  private static property(input: ProductPropertyInput): ProductPropertyDto {
    return plainToInstance(ProductPropertyDto, input);
  }

  private static variant(input: ProductVariantInput): ProductVariantDto {
    const { images, properties, ...values } = input;
    const dto = plainToInstance(ProductVariantDto, values);

    return Object.assign(new ProductVariantDto(), dto, {
      images: images?.map((image) => this.image(image)),
      properties: properties.map((property) => this.property(property)),
    });
  }

  private static image(input: ProductVariantImageInput): ProductVariantImageDto {
    const { file, ...values } = input;
    const dto = plainToInstance(ProductVariantImageDto, values);

    return Object.assign(new ProductVariantImageDto(), dto, { file });
  }
}
