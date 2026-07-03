import { Inject, Injectable } from '@tiyn/app';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { BrandEntity, BrandResultEntity } from '../domain/brand.entity.ts';

import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

import { BrandServiceInterface } from './brand-service.interface.ts';
import { BrandGatewayInterface } from '../gateway/brand-gateway.interface.ts';

@Injectable()
export class BrandService implements BrandServiceInterface {
  constructor(@Inject(BrandGatewayInterface) private readonly brandGateway: BrandGatewayInterface) {}

  async findAll(): Promise<BrandResultEntity> {
    return await this.brandGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<BrandEntity> {
    return await this.brandGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateBrandDto): Promise<BrandEntity> {
    const dtoInstance = plainToInstance(UpdateBrandDto, this.createValidationDto(dto));

    await validateOrReject(dtoInstance);

    return await this.brandGateway.update(uuid, dto);
  }

  async create(dto: CreateBrandDto): Promise<BrandEntity> {
    const dtoInstance = plainToInstance(CreateBrandDto, this.createValidationDto(dto));

    await validateOrReject(dtoInstance);

    return await this.brandGateway.create(dto);
  }

  private createValidationDto<T extends CreateBrandDto | UpdateBrandDto>(dto: T): T {
    if (!dto.image) {
      return dto;
    }

    const { file: _file, ...image } = dto.image;

    return {
      ...dto,
      image,
    };
  }
}
