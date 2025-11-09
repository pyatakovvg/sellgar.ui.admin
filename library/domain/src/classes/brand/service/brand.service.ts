import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { BrandEntity, BrandResultEntity } from '../brand.entity.ts';

import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

import { BrandServiceInterface } from './brand-service.interface.ts';
import { BrandGatewayInterface } from '../gateway/brand-gateway.interface.ts';

@injectable()
export class BrandService implements BrandServiceInterface {
  constructor(@inject(BrandGatewayInterface) private readonly brandGateway: BrandGatewayInterface) {}

  async findAll(): Promise<BrandResultEntity> {
    return await this.brandGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<BrandEntity> {
    return await this.brandGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateBrandDto): Promise<BrandEntity> {
    const dtoInstance = plainToInstance(UpdateBrandDto, dto);

    await validateOrReject(dtoInstance);

    return await this.brandGateway.update(uuid, dtoInstance);
  }

  async create(dto: CreateBrandDto): Promise<BrandEntity> {
    const dtoInstance = plainToInstance(CreateBrandDto, dto);

    await validateOrReject(dtoInstance);

    return await this.brandGateway.create(dtoInstance);
  }
}
