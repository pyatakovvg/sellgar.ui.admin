import type { CreatePropertyInput, PropertyEntity, UpdatePropertyInput } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app-v2';

import { PropertyModifyFrameParams } from '../../params/frame.params.ts';

export type PropertyModifyActionPayload = CreatePropertyInput | UpdatePropertyInput;

export abstract class PropertyModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<PropertyModifyFrameParams>>): Promise<PropertyEntity | undefined>;

  abstract action(
    args: ControllerArgs<WithPayload<PropertyModifyActionPayload, WithParams<PropertyModifyFrameParams>>>,
  ): Promise<void>;

  abstract close(): Promise<void>;
}
