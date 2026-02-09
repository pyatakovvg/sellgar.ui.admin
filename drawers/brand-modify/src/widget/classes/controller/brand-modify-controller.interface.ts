import { BrandEntity, CreateBrandDto, UpdateBrandDto } from '@library/domain';

export abstract class BrandModifyControllerInterface {
  abstract loader(): Promise<BrandEntity | undefined>;

  abstract create(brand: CreateBrandDto): Promise<void>;
  abstract update(uuid: string, brand: UpdateBrandDto): Promise<void>;
  abstract close(): Promise<void>;
  abstract refresh(): void;
}
