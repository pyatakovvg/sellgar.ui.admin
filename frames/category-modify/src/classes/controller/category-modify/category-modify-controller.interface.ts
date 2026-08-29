import type { CategoryEntity, CreateCategoryInput, UpdateCategoryInput } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app-v2';

import { CategoryModifyFrameParams } from '../../params/frame.params.ts';

export type CategoryModifyActionPayload = CreateCategoryInput | UpdateCategoryInput;

export abstract class CategoryModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<CategoryModifyFrameParams>>): Promise<CategoryEntity | undefined>;

  abstract action(
    args: ControllerArgs<WithPayload<CategoryModifyActionPayload, WithParams<CategoryModifyFrameParams>>>,
  ): Promise<void>;

  abstract close(): Promise<void>;
}
