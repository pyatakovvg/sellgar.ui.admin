import { BrandEntity, CreateBrandDto, UpdateBrandDto } from '@library/domain';

export abstract class BrandModifyControllerInterface {
  abstract loader(): Promise<BrandEntity | undefined>;

  abstract create(brand: CreateBrandDto): Promise<BrandEntity>;
  abstract update(uuid: string, brand: UpdateBrandDto): Promise<BrandEntity>;
  abstract close(): Promise<void>;
}
