import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

import { BrandEntity, BrandResultEntity } from '../brand.entity.ts';

export abstract class BrandGatewayInterface {
  abstract findAll(): Promise<BrandResultEntity>;
  abstract findByUuid(uuid: string): Promise<BrandEntity>;
  abstract create(createCategoryDto: CreateBrandDto): Promise<BrandEntity>;
  abstract update(uuid: string, updateCategoryDto: UpdateBrandDto): Promise<BrandEntity>;
}
