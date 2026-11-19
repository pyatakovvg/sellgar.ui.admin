import type { UnitEntity } from '@library/domain';
import type { ControllerArgs, WithParams } from '@sellgar/app';
import type { UnitReviewFrameParams } from '../../params/frame.params.ts';

export abstract class UnitReviewControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<UnitReviewFrameParams>>): Promise<UnitEntity>;
  abstract toModify(code: string): Promise<void>;
}
