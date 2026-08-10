import type { CategoryEntity } from '@library/domain';
import { FrameControllerInterface } from '@sellgar/app';

import { CategoryModifyFrameParams } from '../../params/frame.params.ts';

export abstract class CategoryListControllerInterface extends FrameControllerInterface<CategoryModifyFrameParams> {
  abstract loader(): Promise<CategoryEntity[]>;
}
