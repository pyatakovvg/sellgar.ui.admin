import { UnitServiceInterface } from '@library/domain';
import { Controller, Inject } from '@sellgar/app';

import { UnitControllerInterface } from './unit-controller.interface.ts';

@Controller()
export class UnitController implements UnitControllerInterface {
  constructor(@Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {}

  loader() {
    return this.unitService.findAll();
  }
}
