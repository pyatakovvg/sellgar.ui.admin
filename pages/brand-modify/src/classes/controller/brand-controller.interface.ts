import { BrandEntity, CreateBrandDto, UpdateBrandDto } from '@library/domain';

export abstract class BrandControllerInterface {
  abstract inProcess(): boolean;

  abstract findByUuid(uuid?: string): Promise<BrandEntity | undefined>;

  abstract create(brand: CreateBrandDto): Promise<BrandEntity>;
  abstract update(uuid: string, brand: UpdateBrandDto): Promise<BrandEntity>;
}
