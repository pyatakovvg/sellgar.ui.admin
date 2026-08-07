import { CreateProductInput, ProductEntity, UpdateProductInput } from '@library/domain';
import type { ControllerActionArgs, ControllerLoaderArgs } from '@sellgar/app';

export type ProductActionPayload = CreateProductInput | UpdateProductInput;

export abstract class ProductControllerInterface {
  abstract loader(args: ControllerLoaderArgs): Promise<ProductEntity | undefined>;
  abstract action(args: ControllerActionArgs<ProductActionPayload>): Promise<ProductEntity>;
}
