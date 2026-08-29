import type { ProductEntity } from '@library/domain';

export abstract class ProductListControllerInterface {
  abstract loader(): Promise<ProductEntity[]>;
}
