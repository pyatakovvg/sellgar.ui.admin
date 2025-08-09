import { BrandResultEntity } from '@library/domain';

export abstract class BrandsControllerInterface {
  // abstract getData(): BrandEntity[];
  // abstract getMeta(): MetaEntity;
  //
  abstract findAll(): Promise<BrandResultEntity>;
}
