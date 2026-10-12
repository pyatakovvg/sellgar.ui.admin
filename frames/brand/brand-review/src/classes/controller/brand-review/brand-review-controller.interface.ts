import type { BrandEntity } from '@library/domain';
import type { ControllerArgs, WithParams } from '@sellgar/app';
import type { BrandReviewFrameParams } from '../../params/frame.params.ts';

export abstract class BrandReviewControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<BrandReviewFrameParams>>): Promise<BrandEntity>;
  abstract toModify(code: string): Promise<void>;
}
