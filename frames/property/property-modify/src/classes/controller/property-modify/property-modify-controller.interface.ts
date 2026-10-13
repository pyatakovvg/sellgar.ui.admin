import type { PropertyEntity } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { PropertyModifyFrameParams } from '../../params/frame.params.ts';
import type { PropertySaveInput } from '../../service/property-save/input/property-save.input.ts';

export abstract class PropertyModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<PropertyModifyFrameParams>>): Promise<PropertyEntity | undefined>;

  abstract action(
    args: ControllerArgs<WithPayload<PropertySaveInput, WithParams<PropertyModifyFrameParams>>>,
  ): Promise<void>;

  abstract close(code?: string): Promise<void>;
}
