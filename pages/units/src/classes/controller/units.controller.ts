import { UnitServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { UnitsControllerInterface } from './units-controller.interface.ts';

@injectable()
export class UnitsController implements UnitsControllerInterface {
  constructor(@inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {}

  async loader() {
    return await this.unitService.findAll();
  }
}
