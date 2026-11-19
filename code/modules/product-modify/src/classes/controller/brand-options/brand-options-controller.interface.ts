import type { BrandResultEntity } from '@library/domain';

export abstract class BrandOptionsControllerInterface {
  abstract loader(): Promise<BrandResultEntity>;
}
