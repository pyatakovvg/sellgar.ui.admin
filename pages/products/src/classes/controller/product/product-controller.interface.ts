import type { ProductResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class ProductControllerInterface implements ControllerInterface {
  abstract loader(): Promise<ProductResultEntity>;
  abstract create(): Promise<void>;
  abstract open(uuid: string): Promise<void>;
}
