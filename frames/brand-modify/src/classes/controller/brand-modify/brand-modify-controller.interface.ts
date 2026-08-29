import type { BrandEntity, CreateBrandInput, UpdateBrandInput } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app-v2';

import { BrandModifyFrameParams } from '../../params/frame.params.ts';

export type BrandModifyActionPayload = CreateBrandInput | UpdateBrandInput;

export abstract class BrandModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<BrandModifyFrameParams>>): Promise<BrandEntity | undefined>;

  abstract action(args: ControllerArgs<WithPayload<BrandModifyActionPayload, WithParams<BrandModifyFrameParams>>>): Promise<void>;

  abstract close(): Promise<void>;
}
