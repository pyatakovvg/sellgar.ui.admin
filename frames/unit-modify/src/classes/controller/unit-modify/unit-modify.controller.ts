import { UnitServiceInterface } from '@library/domain';
import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { UnitModifyControllerInterface } from './unit-modify-controller.interface.ts';

@Controller()
export class UnitModifyController implements UnitModifyControllerInterface {
  constructor(
    @Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<UnitModifyControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      return void 0;
    }

    return this.unitService.findByCode(args.params.code);
  }

  async action(args: Parameters<UnitModifyControllerInterface['action']>[0]) {
    if (args.params.code) {
      if (args.payload.version === undefined) {
        throw new Error('Не передана версия размерности.');
      }

      await this.unitService.update(args.params.code, {
        version: args.payload.version,
        name: args.payload.name,
        symbol: args.payload.symbol,
      });
    } else {
      await this.unitService.create({
        code: args.payload.code,
        name: args.payload.name,
        symbol: args.payload.symbol,
      });
    }

    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }

  async close() {
    await this.navigateService.close();
  }
}
