import type { PropertyEntity } from '@library/domain';
import type { ControllerArgs, WithParams } from '@sellgar/app';
import type { PropertyReviewFrameParams } from '../../params/frame.params.ts';

export abstract class PropertyReviewControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<PropertyReviewFrameParams>>): Promise<PropertyEntity>;
  abstract toModify(code: string): Promise<void>;
}
