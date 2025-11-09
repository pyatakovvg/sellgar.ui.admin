import { BrandEntity, CreateBrandDto, UpdateBrandDto } from '@library/domain';

export abstract class BrandModifyControllerInterface {
  abstract findByUuid(uuid?: string): Promise<BrandEntity>;

  abstract create(brand: CreateBrandDto): Promise<BrandEntity>;
  abstract update(uuid: string, brand: UpdateBrandDto): Promise<BrandEntity>;
}
