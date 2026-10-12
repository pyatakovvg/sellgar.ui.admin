import type { UnitEntity } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { UnitModifyFrameParams } from '../../params/frame.params.ts';
import type { UnitModifyInput } from './input/unit-modify.input.ts';

export abstract class UnitModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<UnitModifyFrameParams>>): Promise<UnitEntity | undefined>;

  abstract action(args: ControllerArgs<WithPayload<UnitModifyInput, WithParams<UnitModifyFrameParams>>>): Promise<void>;

  abstract close(code?: string): Promise<void>;
}
