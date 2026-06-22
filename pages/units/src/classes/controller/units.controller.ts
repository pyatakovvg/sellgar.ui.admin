import { UnitServiceInterface } from '@library/domain';

import { Controller, Inject } from '@tiyn/app';

import { UnitsControllerInterface } from './units-controller.interface.ts';

@Controller()
export class UnitsController implements UnitsControllerInterface {
  constructor(@Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {}

  async loader() {
    return await this.unitService.findAll();
  }
}
