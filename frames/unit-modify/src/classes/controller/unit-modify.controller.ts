import { CreateUnitDto, UnitServiceInterface, UpdateUnitDto } from '@library/domain';
import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
  type FrameControllerActionArgs,
  type FrameControllerLoaderArgs,
} from '@sellgar/app';

import { UnitModifyActionPayload, UnitModifyControllerInterface } from './unit-modify-controller.interface.ts';
import { UnitModifyFrameParams } from '../params';

@Controller()
export class UnitModifyController implements UnitModifyControllerInterface {
  constructor(
    @Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<UnitModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.unitService.findByUuid(args.props.uuid);
  }

  async action(args: FrameControllerActionArgs<UnitModifyFrameParams, UnitModifyActionPayload>) {
    if (args.props.uuid) {
      await this.unitService.update(args.props.uuid, args.payload as UpdateUnitDto);
    } else {
      await this.unitService.create(args.payload as CreateUnitDto);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async toList() {
    await this.frameService.close();
  }
}
