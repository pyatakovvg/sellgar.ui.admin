import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

import { BrandEntity, BrandResultEntity } from '../brand.entity.ts';

export abstract class BrandServiceInterface {
  abstract findAll(): Promise<BrandResultEntity>;
  abstract findByUuid(code: string): Promise<BrandEntity>;
  abstract create(createBrandDto: CreateBrandDto): Promise<BrandEntity>;
  abstract update(code: string, updateBrandDto: UpdateBrandDto): Promise<BrandEntity>;
}
