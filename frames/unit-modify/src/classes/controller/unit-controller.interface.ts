import { UnitEntity } from '@library/domain';
import { type FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';
import { type UnitModifyFrameParams } from '../../unit-modify.frame.tsx';

import { UpdateUnitDto } from './dto/update-unit.dto.ts';
import { CreateUnitDto } from './dto/create-unit.dto.ts';

export abstract class UnitControllerInterface implements FrameControllerInterface<UnitModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<UnitModifyFrameParams>): Promise<UnitEntity | undefined>;
  abstract findByUuid(uuid: string): Promise<UnitEntity>;
  abstract create(data: CreateUnitDto): Promise<UnitEntity>;
  abstract update(uuid: string, data: UpdateUnitDto): Promise<UnitEntity>;
}
