import { CreateBrandInput } from '../data/gateway/input/create-brand.input.ts';
import { UpdateBrandInput } from '../data/gateway/input/update-brand.input.ts';

import { BrandEntity } from '../domain/brand.entity.ts';
import { BrandResultEntity } from '../domain/brand-result.entity.ts';

export abstract class BrandServiceInterface {
  abstract findAll(): Promise<BrandResultEntity>;
  abstract findByUuid(code: string): Promise<BrandEntity>;
  abstract create(input: CreateBrandInput): Promise<BrandEntity>;
  abstract update(uuid: string, input: UpdateBrandInput): Promise<BrandEntity>;
}
