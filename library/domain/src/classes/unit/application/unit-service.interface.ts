import { CreateUnitInput } from '../data/gateway/input/create-unit.input.ts';
import { UpdateUnitInput } from '../data/gateway/input/update-unit.input.ts';

import { UnitEntity } from '../domain/unit.entity.ts';
import { UnitResultEntity } from '../domain/unit-result.entity.ts';

export abstract class UnitServiceInterface {
  abstract findAll(): Promise<UnitResultEntity>;
  abstract findByUuid(code: string): Promise<UnitEntity>;
  abstract create(input: CreateUnitInput): Promise<UnitEntity>;
  abstract update(uuid: string, input: UpdateUnitInput): Promise<UnitEntity>;
}
