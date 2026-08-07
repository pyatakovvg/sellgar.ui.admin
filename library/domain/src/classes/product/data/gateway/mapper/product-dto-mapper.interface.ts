import { CreateProductDto } from '../dto/create-product.dto.ts';
import { UpdateProductDto } from '../dto/update-product.dto.ts';
import { CreateProductInput } from '../input/create-product.input.ts';
import { UpdateProductInput } from '../input/update-product.input.ts';

export abstract class ProductDtoMapperInterface {
  abstract create(input: CreateProductInput): CreateProductDto;
  abstract update(input: UpdateProductInput): UpdateProductDto;
}
