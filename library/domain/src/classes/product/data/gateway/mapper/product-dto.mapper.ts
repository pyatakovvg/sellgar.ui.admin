import { Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';

import { CreateProductDto } from '../dto/create-product.dto.ts';
import { UpdateProductDto } from '../dto/update-product.dto.ts';
import { CreateProductInput } from '../input/create-product.input.ts';
import { UpdateProductInput } from '../input/update-product.input.ts';
import { ProductDtoMapperInterface } from './product-dto-mapper.interface.ts';

@Injectable()
export class ProductDtoMapper implements ProductDtoMapperInterface {
  create(input: CreateProductInput): CreateProductDto {
    const dto = plainToInstance(CreateProductDto, this.withoutFiles(input));

    this.restoreFiles(dto, input);
    return dto;
  }

  update(input: UpdateProductInput): UpdateProductDto {
    const dto = plainToInstance(UpdateProductDto, this.withoutFiles(input));

    this.restoreFiles(dto, input);
    return dto;
  }

  private withoutFiles(input: CreateProductInput): CreateProductInput {
    return {
      ...input,
      variants: input.variants.map((variant) => ({
        ...variant,
        images: variant.images?.map(({ file: _file, ...image }) => image),
      })),
    };
  }

  private restoreFiles(dto: CreateProductDto, input: CreateProductInput): void {
    dto.variants.forEach((variant, variantIndex) => {
      variant.images?.forEach((image, imageIndex) => {
        image.file = input.variants[variantIndex]?.images?.[imageIndex]?.file;
      });
    });
  }
}
