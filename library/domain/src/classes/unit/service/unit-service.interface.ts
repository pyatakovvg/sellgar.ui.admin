import { CreateUnitDto } from './dto/create-unit.dto.ts';
import { UpdateUnitDto } from './dto/update-unit.dto.ts';

import { UnitEntity, UnitResultEntity } from '../unit.entity.ts';

export abstract class UnitServiceInterface {
  abstract findAll(): Promise<UnitResultEntity>;
  abstract findByUuid(code: string): Promise<UnitEntity | null>;
  abstract create(createBrandDto: CreateUnitDto): Promise<UnitEntity>;
  abstract update(code: string, updateBrandDto: UpdateUnitDto): Promise<UnitEntity>;
}
