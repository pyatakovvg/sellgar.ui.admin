import type { BrandResultEntity } from '@library/domain';

export abstract class BrandControllerInterface {
  abstract loader(): Promise<BrandResultEntity>;
}
