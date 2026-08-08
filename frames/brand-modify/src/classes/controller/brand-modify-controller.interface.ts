import { BrandEntity, CreateBrandInput, UpdateBrandInput } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@sellgar/app';

import { BrandModifyFrameParams } from '../params';

export type BrandModifyActionPayload = CreateBrandInput | UpdateBrandInput;

export abstract class BrandModifyControllerInterface extends FrameControllerInterface<BrandModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<BrandModifyFrameParams>): Promise<BrandEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<BrandModifyFrameParams, BrandModifyActionPayload>): Promise<void>;

  abstract toList(): Promise<void>;
}
