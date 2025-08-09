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

  async findByUuid(code: string): Promise<UnitEntity> {
    const result = await this.unitGateway.findByUuid(code);
    const resultInstance = plainToInstance(UnitEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, dto: UpdateUnitDto): Promise<UnitEntity> {
    const dtoInstance = plainToInstance(UpdateUnitDto, dto);

    await validateOrReject(dtoInstance);

    const result = await this.unitGateway.update(uuid, dtoInstance);
    const resultInstance = plainToInstance(UnitEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(dto: CreateUnitDto): Promise<UnitEntity> {
    const dtoInstance = plainToInstance(UpdateUnitDto, dto);

    await validateOrReject(dtoInstance);

    const result = await this.unitGateway.create(dtoInstance);
    const resultInstance = plainToInstance(UnitEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
