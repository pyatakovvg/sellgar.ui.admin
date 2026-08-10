import { UnitServiceInterface, type UnitEntity } from '@library/domain';
import { Controller, Inject } from '@sellgar/app';

import { UnitListControllerInterface } from './unit-list-controller.interface.ts';
@Controller()
export class UnitListController implements UnitListControllerInterface {
  constructor(@Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {}

  async loader(): Promise<UnitEntity[]> {
    const result = await this.unitService.findAll();

    return result.data;
  }
}
