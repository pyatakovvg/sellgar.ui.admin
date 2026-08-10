import { UnitServiceInterface } from '@library/domain';
import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
} from '@sellgar/app';

import { UnitModifyControllerInterface } from './unit-modify-controller.interface.ts';

@Controller()
export class UnitModifyController implements UnitModifyControllerInterface {
  constructor(
    @Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<UnitModifyControllerInterface['loader']>[0]) {
    if (!args.props.uuid) {
      return void 0;
    }

    return this.unitService.findByUuid(args.props.uuid);
  }

  async action(args: Parameters<UnitModifyControllerInterface['action']>[0]) {
    if (args.props.uuid) {
      if (args.payload.version === undefined) {
        throw new Error('Не передана версия размерности.');
      }

      await this.unitService.update(args.props.uuid, {
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
    await this.frameService.close();
  }

  async close() {
    await this.frameService.close();
  }
}
