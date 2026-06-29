import { PropertyGroupEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';

import { PropertyModifyFrameParams } from '../params';

export abstract class PropertyGroupListControllerInterface extends FrameControllerInterface<PropertyModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<PropertyModifyFrameParams>): Promise<PropertyGroupEntity[]>;
}
