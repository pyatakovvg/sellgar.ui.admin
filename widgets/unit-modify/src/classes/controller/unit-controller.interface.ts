import { UnitEntity } from '@library/domain';
import { type WidgetControllerInterface, type WidgetControllerLoaderArgs } from '@tiyn/app';
import { type UnitModifyWidgetProps } from '../../widget.context.tsx';

import { UpdateUnitDto } from './dto/update-unit.dto.ts';
import { CreateUnitDto } from './dto/create-unit.dto.ts';

export abstract class UnitControllerInterface implements WidgetControllerInterface<UnitModifyWidgetProps> {
  abstract loader(args: WidgetControllerLoaderArgs<UnitModifyWidgetProps>): Promise<UnitEntity | undefined>;
  abstract findByUuid(uuid: string): Promise<UnitEntity>;
  abstract create(data: CreateUnitDto): Promise<UnitEntity>;
  abstract update(uuid: string, data: UpdateUnitDto): Promise<UnitEntity>;
}
