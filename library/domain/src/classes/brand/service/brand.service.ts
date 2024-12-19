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
    const result = await this.brandGateway.findAll();
    const resultInstance = plainToInstance(BrandResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string): Promise<BrandEntity> {
    const result = await this.brandGateway.findByUuid(uuid);
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, updateCategoryDto: UpdateBrandDto): Promise<BrandEntity> {
    const result = await this.brandGateway.update(uuid, updateCategoryDto);
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(createCategoryDto: CreateBrandDto): Promise<BrandEntity> {
    const result = await this.brandGateway.create(createCategoryDto);
    const resultInstance = plainToInstance(BrandEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
