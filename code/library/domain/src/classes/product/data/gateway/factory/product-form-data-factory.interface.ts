import { CreateProductDto } from '../dto/create-product.dto.ts';
import { CreateVariantDto } from '../dto/create-variant.dto.ts';
import { UpdateVariantDto } from '../dto/update-variant.dto.ts';

export abstract class ProductFormDataFactoryInterface {
  abstract createProduct(dto: CreateProductDto): FormData;
  abstract createVariant(dto: CreateVariantDto): FormData;
  abstract updateVariant(dto: UpdateVariantDto): FormData;
}
