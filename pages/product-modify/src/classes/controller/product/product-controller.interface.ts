import type { ProductEntity } from '@library/domain';
import type { ControllerActionArgs, ControllerInterface, ControllerLoaderArgs } from '@sellgar/app';

import type { ProductModifyResultEntity } from './domain/product-modify-result.entity.ts';
import type { ProductFormInput } from './input/product-form.input.ts';

export abstract class ProductControllerInterface implements ControllerInterface {
  abstract loader(args: ControllerLoaderArgs): Promise<ProductModifyResultEntity>;
  abstract action(args: ControllerActionArgs<ProductFormInput>): Promise<ProductEntity>;
}
