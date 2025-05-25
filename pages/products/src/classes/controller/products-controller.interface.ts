import { ProductsStoreInterface } from '../store/products-store.interface.ts';

export abstract class ProductsControllerInterface {
  abstract readonly productStore: ProductsStoreInterface;

  abstract findAll(): Promise<void>;
}
