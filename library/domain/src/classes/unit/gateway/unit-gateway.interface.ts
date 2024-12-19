import { CreateUnitDto } from './dto/create-unit.dto.ts';
import { UpdateUnitDto } from './dto/update-unit.dto.ts';

export abstract class UnitGatewayInterface {
  abstract findAll(): Promise<any>;
  abstract findByUuid(uuid: string): Promise<any>;
  abstract create(createUnitDto: CreateUnitDto): Promise<any>;
  abstract update(uuid: string, updateUnitDto: UpdateUnitDto): Promise<any>;
}
