import { CreateUnitInput, UnitEntity, UpdateUnitInput } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@sellgar/app';

import { UnitModifyFrameParams } from '../params';

export type UnitModifyActionPayload = CreateUnitInput | UpdateUnitInput;

export abstract class UnitModifyControllerInterface extends FrameControllerInterface<UnitModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<UnitModifyFrameParams>): Promise<UnitEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<UnitModifyFrameParams, UnitModifyActionPayload>): Promise<void>;

  abstract toList(): Promise<void>;
}
