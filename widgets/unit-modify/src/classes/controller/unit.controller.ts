import { UnitServiceInterface } from '@library/domain';

import { Controller, Inject } from '@tiyn/app';
import type { WidgetControllerLoaderArgs } from '@tiyn/app';

import { UpdateUnitDto } from './dto/update-unit.dto.ts';
import { CreateUnitDto } from './dto/create-unit.dto.ts';

import { UnitControllerInterface } from './unit-controller.interface.ts';
import { type UnitModifyWidgetProps } from '../../widget.context.tsx';

@Controller()
export class UnitController implements UnitControllerInterface {
  constructor(@Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {}

  async loader(args: WidgetControllerLoaderArgs<UnitModifyWidgetProps>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.findByUuid(args.props.uuid);
  }

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
