import type { CreatePropertyInput, PropertyEntity, UpdatePropertyInput } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@sellgar/app';

import { PropertyModifyFrameParams } from '../../params/frame.params.ts';

export type PropertyModifyActionPayload = CreatePropertyInput | UpdatePropertyInput;

export abstract class PropertyModifyControllerInterface extends FrameControllerInterface<PropertyModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<PropertyModifyFrameParams>): Promise<PropertyEntity | undefined>;

  abstract action(
    args: FrameControllerActionArgs<PropertyModifyFrameParams, PropertyModifyActionPayload>,
  ): Promise<void>;

  abstract close(): Promise<void>;
}
