import { ProductEntity } from '@library/domain';
import type { ControllerActionArgs, ControllerLoaderArgs } from '@sellgar/app';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

export type ProductActionPayload = CreateProductDto | UpdateProductDto;

export abstract class ProductControllerInterface {
  abstract loader(args: ControllerLoaderArgs): Promise<ProductEntity | undefined>;
  abstract action(args: ControllerActionArgs<ProductActionPayload>): Promise<ProductEntity>;
}
