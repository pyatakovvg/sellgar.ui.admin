import type { BrandResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class BrandOptionsControllerInterface implements ControllerInterface {
  abstract loader(): Promise<BrandResultEntity>;
}
