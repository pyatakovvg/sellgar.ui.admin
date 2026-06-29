import { UnitEntity, UnitServiceInterface } from '@library/domain';
import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import { UnitListControllerInterface } from './unit-list-controller.interface.ts';
import { PropertyModifyFrameParams } from '../params';

@Controller()
export class UnitListController implements UnitListControllerInterface {
  constructor(@Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {}

  async loader(_args: FrameControllerLoaderArgs<PropertyModifyFrameParams>): Promise<UnitEntity[]> {
    const result = await this.unitService.findAll();

    return result.data;
  }
}
