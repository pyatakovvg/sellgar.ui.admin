import { CreatePropertyGroupDto, PropertyGroupEntity, UpdatePropertyGroupDto } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@tiyn/app';

import { PropertyGroupModifyFrameParams } from '../params';

export type PropertyGroupModifyActionPayload = CreatePropertyGroupDto | UpdatePropertyGroupDto;

export abstract class PropertyGroupModifyControllerInterface extends FrameControllerInterface<PropertyGroupModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<PropertyGroupModifyFrameParams>): Promise<PropertyGroupEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<PropertyGroupModifyFrameParams, PropertyGroupModifyActionPayload>): Promise<void>;

  abstract toList(): Promise<void>;
}
