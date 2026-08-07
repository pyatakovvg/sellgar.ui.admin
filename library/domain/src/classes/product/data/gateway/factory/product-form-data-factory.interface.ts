import { CreateProductDto } from '../dto/create-product.dto.ts';
import { UpdateProductDto } from '../dto/update-product.dto.ts';

export abstract class ProductFormDataFactoryInterface {
  abstract create(dto: CreateProductDto | UpdateProductDto): FormData;
}
