import { Inject, Injectable } from '@sellgar/app';

import { BrandServiceInterface } from './brand-service.interface.ts';
import { BrandGatewayInterface } from '../data/gateway/brand-gateway.interface.ts';
import { CreateBrandInput } from '../data/gateway/input/create-brand.input.ts';
import { UpdateBrandInput } from '../data/gateway/input/update-brand.input.ts';
import { BrandEntity } from '../domain/brand.entity.ts';
import { BrandResultEntity } from '../domain/brand-result.entity.ts';

@Injectable()
export class BrandService implements BrandServiceInterface {
  constructor(@Inject(BrandGatewayInterface) private readonly brandGateway: BrandGatewayInterface) {}

  findAll(): Promise<BrandResultEntity> {
    return this.brandGateway.findAll();
  }

  findByUuid(uuid: string): Promise<BrandEntity> {
    return this.brandGateway.findByUuid(uuid);
  }

  update(uuid: string, input: UpdateBrandInput): Promise<BrandEntity> {
    return this.brandGateway.update(uuid, input);
  }

  create(input: CreateBrandInput): Promise<BrandEntity> {
    return this.brandGateway.create(input);
  }
}
