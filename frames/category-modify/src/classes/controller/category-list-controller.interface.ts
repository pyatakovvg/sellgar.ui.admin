import { CategoryEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@sellgar/app';

import { CategoryModifyFrameParams } from '../params';

export abstract class CategoryListControllerInterface extends FrameControllerInterface<CategoryModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<CategoryModifyFrameParams>): Promise<CategoryEntity[]>;
}
