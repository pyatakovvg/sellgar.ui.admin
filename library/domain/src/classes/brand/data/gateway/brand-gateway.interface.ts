import { CreateBrandInput } from './input/create-brand.input.ts';
import { UpdateBrandInput } from './input/update-brand.input.ts';

import { BrandEntity } from '../../domain/brand.entity.ts';
import { BrandResultEntity } from '../../domain/brand-result.entity.ts';

export abstract class BrandGatewayInterface {
  abstract findAll(): Promise<BrandResultEntity>;
  abstract findByUuid(uuid: string): Promise<BrandEntity>;
  abstract create(input: CreateBrandInput): Promise<BrandEntity>;
  abstract update(uuid: string, input: UpdateBrandInput): Promise<BrandEntity>;
}
