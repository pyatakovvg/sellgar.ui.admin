import { UnitEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@sellgar/app';

import { PropertyModifyFrameParams } from '../params';

export abstract class UnitListControllerInterface extends FrameControllerInterface<PropertyModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<PropertyModifyFrameParams>): Promise<UnitEntity[]>;
}
