import { ProductResultEntity } from '@library/domain';

export abstract class ProductsControllerInterface {
  abstract loader(): Promise<ProductResultEntity>;
}
