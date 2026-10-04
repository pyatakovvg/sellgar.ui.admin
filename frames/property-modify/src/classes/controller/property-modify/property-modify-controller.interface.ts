import type { CreatePropertyInput, PropertyEntity } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { PropertyModifyFrameParams } from '../../params/frame.params.ts';

export interface PropertyModifyActionPayload {
  code: string;
  name: string;
  description: string | null;
  kind: CreatePropertyInput['kind'];
  unitCode: string | null;
  version?: number;
  options: Array<{
    persisted: boolean;
    code: string;
    name: string;
    sortOrder: number;
    extras: Array<
      | { type: 'TEXT'; sortOrder: number; textDisplay: 'TEXT' | 'ICON'; valueText: string }
      | { type: 'COLOR'; sortOrder: number; valueColor: string }
      | { type: 'IMAGE'; sortOrder: number; imageUuid: string }
    >;
  }>;
}

export abstract class PropertyModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<PropertyModifyFrameParams>>): Promise<PropertyEntity | undefined>;

  abstract action(
    args: ControllerArgs<WithPayload<PropertyModifyActionPayload, WithParams<PropertyModifyFrameParams>>>,
  ): Promise<void>;

  abstract close(): Promise<void>;
}
