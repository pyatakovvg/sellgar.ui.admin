import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import type { CategoryModifyFrameParams } from '../../params/frame.params.ts';
import type { CategoryModifyResultEntity } from './domain/category-modify-result.entity.ts';

export interface CategoryModifyActionPayload {
  name: string;
  description: string | null;
  parentUuid: string | null;
  expectedVersion?: number;
}

export abstract class CategoryModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<CategoryModifyFrameParams>>): Promise<CategoryModifyResultEntity>;
  abstract action(
    args: ControllerArgs<WithPayload<CategoryModifyActionPayload, WithParams<CategoryModifyFrameParams>>>,
  ): Promise<void>;
  abstract close(): Promise<void>;
}
