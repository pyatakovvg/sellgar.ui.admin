import { CreateBrandInput } from './input/create-brand.input.ts';
import { UpdateBrandInput } from './input/update-brand.input.ts';

import { BrandEntity } from '../../domain/brand.entity.ts';
import { BrandResultEntity } from '../../domain/brand-result.entity.ts';

export abstract class BrandGatewayInterface {
  abstract findAll(): Promise<BrandResultEntity>;
  abstract findByCode(code: string): Promise<BrandEntity>;
  abstract create(input: CreateBrandInput): Promise<BrandEntity>;
  abstract update(code: string, input: UpdateBrandInput): Promise<BrandEntity>;
}
