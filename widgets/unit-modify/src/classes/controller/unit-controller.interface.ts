import { UnitEntity } from '@library/domain';

import { UpdateUnitDto } from './dto/update-unit.dto.ts';
import { CreateUnitDto } from './dto/create-unit.dto.ts';

export abstract class UnitControllerInterface {
  abstract findByUuid(uuid: string): Promise<UnitEntity>;
  abstract create(data: CreateUnitDto): Promise<UnitEntity>;
  abstract update(uuid: string, data: UpdateUnitDto): Promise<UnitEntity>;
}
