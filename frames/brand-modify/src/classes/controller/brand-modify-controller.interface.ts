import { BrandEntity, CreateBrandDto, UpdateBrandDto } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@sellgar/app';

import { BrandModifyFrameParams } from '../params';

export type BrandModifyActionPayload = CreateBrandDto | UpdateBrandDto;

export abstract class BrandModifyControllerInterface extends FrameControllerInterface<BrandModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<BrandModifyFrameParams>): Promise<BrandEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<BrandModifyFrameParams, BrandModifyActionPayload>): Promise<void>;

  abstract getFileImageUrl(fileUuid: string): string;
  abstract toList(): Promise<void>;
}
