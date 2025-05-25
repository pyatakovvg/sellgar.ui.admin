import { ProductsStoreInterface } from '../store/products-store.interface.ts';

export abstract class StoreControllerInterface {
  abstract readonly productStore: ProductsStoreInterface;

  abstract findAll(): Promise<void>;
}
