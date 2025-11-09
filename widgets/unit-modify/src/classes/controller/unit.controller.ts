import { UnitServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { UpdateUnitDto } from './dto/update-unit.dto.ts';
import { CreateUnitDto } from './dto/create-unit.dto.ts';

import { UnitControllerInterface } from './unit-controller.interface.ts';

@injectable()
export class UnitController implements UnitControllerInterface {
  constructor(@inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {}

  async update(uuid: string, entity: UpdateUnitDto) {
    return await this.unitService.update(uuid, entity);
  }

  async create(entity: CreateUnitDto) {
    return await this.unitService.create(entity);
  }

  findByUuid(uuid: string) {
    return this.unitService.findByUuid(uuid);
  }
}
