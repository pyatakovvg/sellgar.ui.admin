import { BrandResultEntity } from '@library/domain';
import { type ControllerInterface } from '@tiyn/app';

export abstract class BrandsControllerInterface implements ControllerInterface {
  abstract loader(): Promise<BrandResultEntity>;
}
