import type { CreateUnitInput, UnitEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@sellgar/app';

import { UnitModifyFrameParams } from '../../params/frame.params.ts';

export interface UnitModifyActionPayload extends CreateUnitInput {
  version?: number;
}

export abstract class UnitModifyControllerInterface extends FrameControllerInterface<UnitModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<UnitModifyFrameParams>): Promise<UnitEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<UnitModifyFrameParams, UnitModifyActionPayload>): Promise<void>;

  abstract close(): Promise<void>;
}
