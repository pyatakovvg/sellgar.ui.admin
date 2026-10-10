import type { ProductResultEntity } from '@library/domain';

export abstract class ProductControllerInterface {
  abstract loader(): Promise<ProductResultEntity>;
  abstract create(): Promise<void>;
  abstract open(uuid: string): Promise<void>;
}
