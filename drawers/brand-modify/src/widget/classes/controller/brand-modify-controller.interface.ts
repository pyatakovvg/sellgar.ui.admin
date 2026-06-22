import { BrandEntity, CreateBrandDto, UpdateBrandDto } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';
import { type BrandModifyFrameParams } from '../../../brand-modify.frame.tsx';

export abstract class BrandModifyControllerInterface extends FrameControllerInterface<BrandModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<BrandModifyFrameParams>): Promise<BrandEntity | undefined>;

  abstract create(brand: CreateBrandDto): Promise<void>;
  abstract update(uuid: string, brand: UpdateBrandDto): Promise<void>;
  abstract close(): Promise<void>;
}
