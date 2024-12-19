import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

import { CurrencyEntity, BrandResultEntity } from '../currency.entity.ts';

export abstract class BrandServiceInterface {
  abstract findAll(): Promise<BrandResultEntity>;
  abstract findByUuid(code: string): Promise<CurrencyEntity>;
  abstract create(createBrandDto: CreateBrandDto): Promise<CurrencyEntity>;
  abstract update(code: string, updateBrandDto: UpdateBrandDto): Promise<CurrencyEntity>;
}
