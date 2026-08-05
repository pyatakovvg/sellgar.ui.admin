import { BrandResultEntity } from '@library/domain';
import { type ControllerInterface } from '@sellgar/app';

export abstract class BrandsControllerInterface implements ControllerInterface {
  abstract loader(): Promise<BrandResultEntity>;
}
