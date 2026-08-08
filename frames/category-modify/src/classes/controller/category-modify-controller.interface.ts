import { CategoryEntity, CreateCategoryInput, UpdateCategoryInput } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@sellgar/app';

import { CategoryModifyFrameParams } from '../params';

export type CategoryModifyActionPayload = CreateCategoryInput | UpdateCategoryInput;

export abstract class CategoryModifyControllerInterface extends FrameControllerInterface<CategoryModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<CategoryModifyFrameParams>): Promise<CategoryEntity | undefined>;

  abstract action(
    args: FrameControllerActionArgs<CategoryModifyFrameParams, CategoryModifyActionPayload>,
  ): Promise<void>;

  abstract toList(): Promise<void>;
}
