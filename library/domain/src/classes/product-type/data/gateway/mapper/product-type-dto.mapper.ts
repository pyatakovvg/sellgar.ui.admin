import { plainToInstance } from 'class-transformer';

import { CreateProductTypeDto } from '../dto/create-product-type.dto.ts';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto.ts';
import type { CreateProductTypeInput } from '../input/create-product-type.input.ts';
import type { UpdateProductTypeInput } from '../input/update-product-type.input.ts';

export class ProductTypeDtoMapper {
  static create(input: CreateProductTypeInput): CreateProductTypeDto {
    return plainToInstance(CreateProductTypeDto, input);
  }

  static update(input: UpdateProductTypeInput): UpdateProductTypeDto {
    return plainToInstance(UpdateProductTypeDto, input);
  }
}
