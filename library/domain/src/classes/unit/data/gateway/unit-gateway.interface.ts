import { CreateUnitInput } from './input/create-unit.input.ts';
import { UpdateUnitInput } from './input/update-unit.input.ts';
import { UnitEntity } from '../../domain/unit.entity.ts';
import { UnitResultEntity } from '../../domain/unit-result.entity.ts';

export abstract class UnitGatewayInterface {
  abstract findAll(): Promise<UnitResultEntity>;
  abstract findByUuid(uuid: string): Promise<UnitEntity>;
  abstract create(input: CreateUnitInput): Promise<UnitEntity>;
  abstract update(uuid: string, input: UpdateUnitInput): Promise<UnitEntity>;
}
