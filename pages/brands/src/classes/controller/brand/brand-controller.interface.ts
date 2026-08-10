import type { BrandResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class BrandControllerInterface implements ControllerInterface {
  abstract loader(): Promise<BrandResultEntity>;
}
