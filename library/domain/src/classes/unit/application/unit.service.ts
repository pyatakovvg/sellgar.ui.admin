import { Inject, Injectable } from '@sellgar/app';

import { UnitServiceInterface } from './unit-service.interface.ts';
import { UnitGatewayInterface } from '../data/gateway/unit-gateway.interface.ts';
import { CreateUnitInput } from '../data/gateway/input/create-unit.input.ts';
import { UpdateUnitInput } from '../data/gateway/input/update-unit.input.ts';
import { UnitEntity } from '../domain/unit.entity.ts';
import { UnitResultEntity } from '../domain/unit-result.entity.ts';

@Injectable()
export class UnitService implements UnitServiceInterface {
  constructor(@Inject(UnitGatewayInterface) private readonly unitGateway: UnitGatewayInterface) {}

  findAll(): Promise<UnitResultEntity> {
    return this.unitGateway.findAll();
  }

  findByUuid(uuid: string): Promise<UnitEntity> {
    return this.unitGateway.findByUuid(uuid);
  }

  update(uuid: string, input: UpdateUnitInput): Promise<UnitEntity> {
    return this.unitGateway.update(uuid, input);
  }

  create(input: CreateUnitInput): Promise<UnitEntity> {
    return this.unitGateway.create(input);
  }
}
