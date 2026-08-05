import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@sellgar/app';

import { CategoryModifyFrameParams } from '../params';

export type CategoryModifyActionPayload = CreateCategoryDto | UpdateCategoryDto;

export abstract class CategoryModifyControllerInterface extends FrameControllerInterface<CategoryModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<CategoryModifyFrameParams>): Promise<CategoryEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<CategoryModifyFrameParams, CategoryModifyActionPayload>): Promise<void>;

  abstract getFileImageUrl(fileUuid: string): string;
  abstract toList(): Promise<void>;
}
