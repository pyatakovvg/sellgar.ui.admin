import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { UnitEntity, UnitResultEntity } from '../unit.entity.ts';

import { CreateUnitDto } from './dto/create-unit.dto.ts';
import { UpdateUnitDto } from './dto/update-unit.dto.ts';

import { UnitServiceInterface } from './unit-service.interface.ts';
import { UnitGatewayInterface } from '../gateway/unit-gateway.interface.ts';

@injectable()
export class UnitService implements UnitServiceInterface {
  constructor(@inject(UnitGatewayInterface) private readonly unitGateway: UnitGatewayInterface) {}

  async findAll(): Promise<UnitResultEntity> {
    const result = await this.unitGateway.findAll();
    const resultInstance = plainToInstance(UnitResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string): Promise<UnitEntity | null> {
    const result = await this.unitGateway.findByUuid(uuid);
    const resultInstance = plainToInstance(UnitEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, updateCategoryDto: UpdateUnitDto): Promise<UnitEntity> {
    const result = await this.unitGateway.update(uuid, updateCategoryDto);
    const resultInstance = plainToInstance(UnitEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(createCategoryDto: CreateUnitDto): Promise<UnitEntity> {
    const result = await this.unitGateway.create(createCategoryDto);
    const resultInstance = plainToInstance(UnitEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
