import type { CreateUnitInput, UnitEntity } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { UnitModifyFrameParams } from '../../params/frame.params.ts';

export interface UnitModifyActionPayload extends CreateUnitInput {
  version?: number;
}

export abstract class UnitModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<UnitModifyFrameParams>>): Promise<UnitEntity | undefined>;

  abstract action(args: ControllerArgs<WithPayload<UnitModifyActionPayload, WithParams<UnitModifyFrameParams>>>): Promise<void>;

  abstract close(): Promise<void>;
}
