import { type IController } from '@library/app';
import { BrandResultEntity } from '@library/domain';

export abstract class BrandsControllerInterface implements IController {
  abstract loader(): Promise<BrandResultEntity>;
}
