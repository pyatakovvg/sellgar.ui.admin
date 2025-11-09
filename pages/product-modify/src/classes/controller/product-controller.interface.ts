import { ProductEntity } from '@library/domain';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

export abstract class ProductControllerInterface {
  abstract formStore: FormStoreInterface;

  abstract findByUuid(uuid?: string): Promise<ProductEntity | void>;
  abstract create(dto: CreateProductDto): Promise<ProductEntity>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<ProductEntity>;
}
