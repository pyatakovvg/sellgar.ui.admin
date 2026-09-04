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
    if (!args.params.uuid) {
      return void 0;
    }

    return this.unitService.findByUuid(args.params.uuid);
  }

  async action(args: Parameters<UnitModifyControllerInterface['action']>[0]) {
    if (args.params.uuid) {
      if (args.payload.version === undefined) {
        throw new Error('Не передана версия размерности.');
      }

      await this.unitService.update(args.params.uuid, {
        ...args.payload,
        version: args.payload.version,
      });
    } else {
      await this.unitService.create({
        code: args.payload.code,
        name: args.payload.name,
        description: args.payload.description,
      });
    }

    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }

  async close() {
    await this.navigateService.close();
  }
}
