import { PropertyGroupEntity } from '@library/domain';
import { type FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';
import { type PropertyGroupModifyFrameParams } from '../../property-group-modify.frame.tsx';

import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

export abstract class PropertyGroupModifyControllerInterface
  implements FrameControllerInterface<PropertyGroupModifyFrameParams>
{
  abstract loader(args: FrameControllerLoaderArgs<PropertyGroupModifyFrameParams>): Promise<PropertyGroupEntity | undefined>;
  abstract findByUuid(uuid?: string): Promise<PropertyGroupEntity>;

  abstract create(data: CreatePropertyGroupDto): Promise<PropertyGroupEntity>;
  abstract update(uuid: string, data: UpdatePropertyGroupDto): Promise<PropertyGroupEntity>;
}
