import type { BrandEntity } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { BrandModifyFrameParams } from '../../params/frame.params.ts';
import type { BrandModifyInput } from './input/brand-modify.input.ts';

export abstract class BrandModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<BrandModifyFrameParams>>): Promise<BrandEntity | undefined>;

  abstract action(
    args: ControllerArgs<WithPayload<BrandModifyInput, WithParams<BrandModifyFrameParams>>>,
  ): Promise<void>;

  abstract close(code?: string): Promise<void>;
}
