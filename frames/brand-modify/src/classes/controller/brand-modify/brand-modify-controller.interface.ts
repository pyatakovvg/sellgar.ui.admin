import type { BrandEntity, CreateBrandInput } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { BrandModifyFrameParams } from '../../params/frame.params.ts';

export interface BrandModifyActionPayload extends CreateBrandInput {
  version?: number;
}

export abstract class BrandModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<BrandModifyFrameParams>>): Promise<BrandEntity | undefined>;

  abstract action(args: ControllerArgs<WithPayload<BrandModifyActionPayload, WithParams<BrandModifyFrameParams>>>): Promise<void>;

  abstract close(): Promise<void>;
}
