import type { UnitEntity } from '@library/domain';
import { FrameControllerInterface } from '@sellgar/app';

import { PropertyModifyFrameParams } from '../../params/frame.params.ts';

export abstract class UnitListControllerInterface extends FrameControllerInterface<PropertyModifyFrameParams> {
  abstract loader(): Promise<UnitEntity[]>;
}
